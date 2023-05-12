import { StyleSheet, View } from "react-native";

export const Progress = ({ done = 100 }) => {
  return (
    <View style={styles.progress}>
      <View
        style={{
          backgroundColor: "#d8d8c9",
          borderRadius: 20,
          height: 30,
          width: `${done}%`,
          position: "absolute",
          top: 0,
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  progress: {
    backgroundColor: "#252285",
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 15,
    height: 30,
    width: "auto",
  },
});
