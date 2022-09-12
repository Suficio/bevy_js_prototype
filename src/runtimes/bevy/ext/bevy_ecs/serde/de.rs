use bevy::reflect::{DynamicList, DynamicStruct, Reflect};
use deno_core::serde::{
    self,
    de::{DeserializeSeed, Error, MapAccess, SeqAccess, Visitor},
};
use std::fmt;

macro_rules! deserialize_reflect {
    ( $dmethod:ident, $t:tt ) => {
        fn $dmethod<E>(self, v: $t) -> Result<Self::Value, E>
        where
            E: Error,
        {
            Ok(Box::new(v))
        }
    };
}

pub struct DynamicReflectDeserializer;

impl<'de> DeserializeSeed<'de> for DynamicReflectDeserializer {
    type Value = Box<dyn Reflect>;

    fn deserialize<D>(self, deserializer: D) -> Result<Self::Value, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(DynamicReflectDeserializerVisitor)
    }
}

struct DynamicReflectDeserializerVisitor;

impl<'de> Visitor<'de> for DynamicReflectDeserializerVisitor {
    type Value = Box<dyn Reflect>;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("map containing a `type` entry containing `value` or a value type")
    }

    deserialize_reflect!(visit_bool, bool);

    deserialize_reflect!(visit_i8, i8);
    deserialize_reflect!(visit_i16, i16);
    deserialize_reflect!(visit_i32, i32);
    deserialize_reflect!(visit_i64, i64);

    deserialize_reflect!(visit_u8, u8);
    deserialize_reflect!(visit_u16, u16);
    deserialize_reflect!(visit_u32, u32);
    deserialize_reflect!(visit_u64, u64);

    deserialize_reflect!(visit_f32, f32);
    deserialize_reflect!(visit_f64, f64);

    deserialize_reflect!(visit_string, String);

    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: Error,
    {
        Ok(Box::new(v.to_string()))
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: MapAccess<'de>,
    {
        let type_name = map
            .next_key::<String>()?
            .ok_or_else(|| Error::invalid_length(0, &"at least one entry"))?;

        map.next_value_seed(TypedDynamicReflectDeserializer { type_name })
    }
}

pub struct TypedDynamicReflectDeserializer {
    type_name: String,
}

impl<'a, 'de> DeserializeSeed<'de> for TypedDynamicReflectDeserializer {
    type Value = Box<dyn Reflect>;

    fn deserialize<D>(self, deserializer: D) -> Result<Self::Value, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_any(TypedDynamicReflectDeserializerVisitor {
            type_name: self.type_name,
        })
    }
}

struct TypedDynamicReflectDeserializerVisitor {
    type_name: String,
}

impl<'de> Visitor<'de> for TypedDynamicReflectDeserializerVisitor {
    type Value = Box<dyn Reflect>;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter
            .write_str("object that can be represented as dynamic type or reflected as a value")
    }

    deserialize_reflect!(visit_bool, bool);

    deserialize_reflect!(visit_i8, i8);
    deserialize_reflect!(visit_i16, i16);
    deserialize_reflect!(visit_i32, i32);
    deserialize_reflect!(visit_i64, i64);

    deserialize_reflect!(visit_u8, u8);
    deserialize_reflect!(visit_u16, u16);
    deserialize_reflect!(visit_u32, u32);
    deserialize_reflect!(visit_u64, u64);

    deserialize_reflect!(visit_f32, f32);
    deserialize_reflect!(visit_f64, f64);

    deserialize_reflect!(visit_string, String);

    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: Error,
    {
        Ok(Box::new(v.to_string()))
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: SeqAccess<'de>,
    {
        let mut list = DynamicList::default();
        list.set_name(self.type_name);
        while let Some(value) = seq.next_element_seed(DynamicReflectDeserializer)? {
            list.push_box(value);
        }
        Ok(Box::new(list))
    }

    fn visit_map<A>(self, mut map: A) -> Result<Self::Value, A::Error>
    where
        A: MapAccess<'de>,
    {
        let mut dynamic_struct = DynamicStruct::default();
        dynamic_struct.set_name(self.type_name);
        while let Some(key) = map.next_key::<String>()? {
            let value = map.next_value_seed(DynamicReflectDeserializer)?;
            dynamic_struct.insert_boxed(&key, value);
        }

        Ok(Box::new(dynamic_struct))
    }
}
