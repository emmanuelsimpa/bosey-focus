import React from "react";
import { StyleSheet, View } from "react-native";
import { RoundedButton } from "../../component/RoundedButton";

export const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.container}>
      <RoundedButton size={75} title={10} click={() => onChangeTime(10)} />
      <RoundedButton size={75} title={15} click={() => onChangeTime(15)} />
      <RoundedButton size={75} title={20} click={() => onChangeTime(20)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
