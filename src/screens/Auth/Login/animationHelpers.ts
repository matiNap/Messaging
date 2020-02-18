import Animated, { Clock } from "react-native-reanimated";
import { runTiming, runSpring } from "_helpers/animations";
import { State } from "react-native-gesture-handler";
import metrics from "_metrics";

const { svgHeight } = metrics.login;

const initHorizontalRadius = 70;
const maxHorizontalRadius = metrics.screenWidth * 0.8;

const inititalVerticalRadius = 35;

const {
  Value,
  block,
  cond,
  eq,
  set,
  sub,
  add,
  multiply,
  lessThan,
  greaterThan,
  call,
  interpolate,
  startClock,
  stopClock,
  clockRunning,
  spring,
  divide,
  lessOrEq,
  greaterOrEq,
  exp,
  cos,
  debug
} = Animated;

export const waveSwipeY = (
  gestureState: State,
  y: Animated.Node<number>,
  opened: Animated.Node<number>,
  back: Animated.Node<number>
) => {
  const swipeY = new Value(metrics.screenHeight);
  return block([
    cond(
      eq(back, 0),
      [
        cond(eq(gestureState, State.ACTIVE), [
          cond(
            eq(opened, 0),
            [
              cond(
                lessThan(y, 0),
                set(swipeY, add(0, add(metrics.screenHeight, y)))
              )
            ],
            [cond(greaterThan(y, 0), set(swipeY, add(0, y)))]
          )
        ]),
        cond(eq(gestureState, State.END), [
          cond(
            greaterThan(y, metrics.login.swipe),
            [
              runTiming(swipeY, metrics.screenHeight, () => {
                opened.setValue(0);
              }),
              set(opened, 0)
            ],
            cond(
              lessThan(y, -metrics.login.swipe),
              [
                runTiming(swipeY, 0, () => {
                  opened.setValue(1);
                }),
                set(opened, 1)
              ],
              cond(eq(opened, 1), [runTiming(swipeY, 0)])
            )
          )
        ])
      ],
      cond(runTiming(swipeY, metrics.screenHeight), [set(back, 0)])
    ),
    swipeY
  ]);
};

export const followPointer = (value: Animated.Node<number>) => {
  const clock = new Clock();
  const config = {
    ...Animated.SpringUtils.makeDefaultConfig(),
    toValue: new Value(0)
  };
  const state = {
    time: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    finished: new Value(0)
  };
  return block([
    startClock(clock),
    set(config.toValue, value),
    spring(clock, state, config),
    state.position
  ]);
};

export const waveHorizontalRadius = (
  progress: Animated.Node<number>,
  gestureState: State,
  opened: Animated.Node<number>
) => {
  const value = new Value(initHorizontalRadius);
  return block([
    cond(
      eq(gestureState, State.ACTIVE),
      [
        cond(
          lessOrEq(progress, 0),
          set(value, initHorizontalRadius),
          cond(
            greaterOrEq(progress, 1),
            set(value, initHorizontalRadius),
            set(
              value,
              add(
                initHorizontalRadius,
                multiply(maxHorizontalRadius - initHorizontalRadius, progress)
              )
            )
          )
        )
      ],
      [
        cond(eq(gestureState, State.END), [
          cond(
            eq(opened, 1),
            [runSpring(value, maxHorizontalRadius, 10)],
            [runSpring(value, initHorizontalRadius, 0)]
          )
        ])
      ]
    ),
    value
  ]);
};

export const waveVerticalRadius = (
  progress: Animated.Node<number>,
  gestureState: State,
  opened: Animated.Node<number>
) => {
  const value = new Value(inititalVerticalRadius);

  return [
    cond(
      eq(gestureState, State.ACTIVE),
      [
        cond(
          eq(opened, 0),
          [
            cond(
              lessOrEq(progress, 0),
              set(value, inititalVerticalRadius),
              cond(
                lessOrEq(progress, 1),
                [
                  set(
                    value,
                    add(
                      inititalVerticalRadius,
                      multiply(progress, svgHeight * 0.5 - svgHeight * 0.2)
                    )
                  )
                ],
                greaterOrEq(eq(progress, 1), [set(value, 0)])
              )
            )
          ],
          [set(value, 0)]
        )
      ],
      cond(eq(gestureState, State.END), [
        runSpring(value, inititalVerticalRadius, 5)
      ])
    ),
    value
  ];
};

export const getProgress = (value: Animated.Node<number>) => {
  return block([
    interpolate(value, {
      inputRange: [-metrics.screenHeight, 0],
      outputRange: [1, 0]
    })
  ]);
};
