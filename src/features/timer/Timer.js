import React, { useState } from "react";
import { Platform, StyleSheet, Text, Vibration, View } from "react-native";
import { paddingSize } from "../../utils/sizes";
import { Countdown } from "../../component/Countdown";
import { RoundedButton } from "../../component/RoundedButton";
import { Timing } from "./Timing";
import { useKeepAwake } from "expo-keep-awake";
import { Progress } from "../../component/Progress";
import * as Animatable from "react-native-animatable";

export const Timer = ({ focusSubject, setFocusedSubject, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState("100");
  const [minute, setMinute] = useState(0.2);

  const onEnd = () => {
    vibrate();
    setMinute(minute);
    setFocusedSubject();
    setProgress(100);
    setIsStarted(false);
  };

  const changeTime = (x) => {
    setMinute(x);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
      return;
    }
    Vibration.vibrate(10000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown
          minutes={minute}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBar}>
        <Progress done={progress} />
      </View>
      <View style={styles.roundedButton}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.roundedButton}>
        <Animatable.View
          animation={!isStarted ? "fadeIn" : "pulse"}
          easing={!isStarted ? "ease-in" : "ease-out"}
          iterationCount={!isStarted ? 1 : "infinite"}
        >
          <RoundedButton
            title={!isStarted ? "Start" : "Pause"}
            click={() => setIsStarted(!isStarted)}
          />
        </Animatable.View>
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} click={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  titleContainer: {
    paddingTop: Platform.OS === "ios" ? paddingSize.md : paddingSize.sm,
  },
  title: {
    color: "#ffffff",
    textAlign: "center",
  },
  task: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  countDown: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  roundedButton: {
    flex: 0.3,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  progressBar: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
