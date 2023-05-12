import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Focus } from "./src/features/focus/focus";
import { Timer } from "./src/features/timer/Timer";
import { FocusHistory } from "./src/features/focus/focusHistory";

export default function App() {
  const key = Math.round(Math.random() * 1000000).toString(36);

  const [focusSubject, setFocusedSubject] = useState(null);
  const [focusHistory, setFocusedHistory] = useState([]);

  const updateFocusHistory = (subject, status, key) => {
    setFocusedHistory([
      ...focusHistory,
      {
        subject,
        status,
        key,
      },
    ]);
  };

  const onClear = () => {
    setFocusedHistory([]);
  };

  const saveFocusedHistory = async () => {
    try {
      await localStorage.setItem("focus", JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  };

  const loadFocusedHistory = async () => {
    try {
      const response = await localStorage.getItem("focus");
      console.log("ln 38", response);
      if (response && JSON.parse(response.length)) {
        setFocusedHistory(JSON.parse(response));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFocusedHistory();
  }, []);

  useEffect(() => {
    saveFocusedHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          setFocusedSubject={() => {
            updateFocusHistory(focusSubject, "complete", key);
            setFocusedSubject(null);
          }}
          clearSubject={() => {
            updateFocusHistory(focusSubject, "cancelled", key);
            setFocusedSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusedSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252250",
  },
});
