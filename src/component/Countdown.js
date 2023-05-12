import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { paddingSize } from "../utils/sizes";
import { fontSize } from "../utils/sizes";

const minutesToMilliseconds = (x) => x * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  minutes = 20,
  isPaused = true,
  onProgress,
  onEnd,
}) => {
  const interval = useRef(null);

  const [milliseconds, setMilliseconds] = useState(
    minutesToMilliseconds(minutes)
  );
  const [time, setTime] = useState({
    minutes: "0",
    seconds: "0",
  });

  const countDown = () => {
    setMilliseconds((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMilliseconds(minutesToMilliseconds(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress((milliseconds / minutesToMilliseconds(minutes)) * 100);
    setTime({
      minutes: Math.floor(milliseconds / 1000 / 60) % 60,
      seconds: Math.floor(milliseconds / 1000) % 60,
    });
    if (milliseconds === 0) {
      onEnd();
    }
  }, [milliseconds]);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View>
      <Text style={style.text}>
        {formatTime(time.minutes)}:{formatTime(time.seconds)}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  text: {
    fontSize: fontSize.xxxl,
    fontWeight: "bold",
    color: "white",
    padding: paddingSize.lg,
    backgroundColor: "rgba(94, 132, 226, 0.6)",
  },
});
