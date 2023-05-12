import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../../component/RoundedButton";
import { fontSize, paddingSize } from "../../utils/sizes";

export const Focus = ({ addSubject }) => {
  const [item, setItem] = useState(null);
  const HandleAddSubject = () => {
    addSubject(item);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(data) => setItem(data)}
          />
          <RoundedButton size={50} title="+" click={HandleAddSubject} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: paddingSize.md,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: fontSize.lg,
  },
  inputContainer: {
    paddingTop: paddingSize.md,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 20,
  },
});
