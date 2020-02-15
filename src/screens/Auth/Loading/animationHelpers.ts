import Animated, { multiply, startClock } from "react-native-reanimated";

const { Value, eq, cond, Clock, block, sin, divide, modulo } = Animated;

export const waveVerticalRadius = () => {
  const clock = new Clock();

  return [startClock(clock), divide(clock, 500)];
};
