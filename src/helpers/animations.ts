import Animated, { Easing } from "react-native-reanimated";

const {
  Value,
  timing,
  block,
  startClock,
  stopClock,
  clockRunning,
  cond,
  Clock,
  set,
  call,
  spring
} = Animated;

export const runTiming = (value: Animated.Node<number>, dest: number) => {
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: value,
    time: new Value(0)
  };

  const clock = new Clock();

  const config = {
    duration: new Value(300),
    easing: Easing.in(Easing.ease),
    toValue: new Value(0)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(config.toValue, dest),
      set(state.time, 0),
      set(state.frameTime, 0),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.finished
  ]);
};

export const runSpring = (
  value: Animated.Node<number>,
  dest: number,
  velocity: number
) => {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: value,
    time: new Value(0)
  };
  const clock = new Clock();
  const config = {
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0)
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    spring(clock, state, config),
    cond(state.finished, [stopClock(clock)])
  ];
};
