import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  click,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={click}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#fff",
      borderWidth: 2,
    },
    text: { color: "#fff", fontSize: size / 3 },
  });
