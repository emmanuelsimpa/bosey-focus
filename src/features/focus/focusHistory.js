import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { fontSize, paddingSize } from "../../utils/sizes";
import { View } from "react-native-animatable";
import { RoundedButton } from "../../component/RoundedButton";

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: "center" }}
              data={focusHistory}
              renderItem={({ item }) => <HistoryItem item={item} />}
              keyExtractor={(item) => item.key}
            />
            <View style={styles.clearContainer}>
              <RoundedButton size={75} title="Clear" click={() => onClear()} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status !== "complete" ? "red" : "green",
    fontSize: fontSize.md,
  }),
  title: {
    color: "white",
    fontSize: fontSize.lg,
  },
  clearContainer: {
    alignItems: "center",
    padding: paddingSize.md,
  },
});
