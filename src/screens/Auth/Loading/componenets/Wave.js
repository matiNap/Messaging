import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import metrics from '_metrics';
import palette from '_palette';
import {
  moveTo,
  curveTo,
  lineTo,
  close,
} from '_helpers/svgHelper.ts';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';
import MaskedView from '@react-native-community/masked-view';

const { add, sub, concat, multiply, Value, cond, eq, sin } = Animated;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const N = 3;
const createXaxis = () => {
  const offset = metrics.screenWidth / N;
  const xAxis = [-offset];
  for (let i = 1; i <= N - 2; i++) {
    xAxis.push(i * offset);
  }
  xAxis.push(metrics.screenWidth + offset);

  return xAxis;
};
const Wave = props => {
  const { verticalRadius, children } = props;
  const maxHeight = metrics.screenHeight / 3;
  const xAxis = createXaxis();
  const waveCenterY = metrics.screenHeight / 2;
  const commands = [];
  moveTo(commands, 0, 0);
  lineTo(commands, 0, waveCenterY);
  for (let i = 0; i < N; i += 3) {
    curveTo(commands, {
      c1: {
        x: xAxis[i],
        y: add(
          waveCenterY,
          multiply(maxHeight, sin(add(verticalRadius, i))),
        ),
      },
      c2: {
        x: xAxis[i + 1],
        y: add(
          waveCenterY,
          multiply(maxHeight, sin(add(verticalRadius, i + 1))),
        ),
      },
      to: {
        x: xAxis[i + 2],
        y: add(
          waveCenterY,
          multiply(maxHeight, sin(add(verticalRadius, i + 2))),
        ),
      },
    });
  }
  lineTo(commands, metrics.screenWidth, waveCenterY);

  lineTo(commands, metrics.screenWidth, 0);
  close(commands);
  const d = commands.reduce((acc, c) => concat(acc, c));

  const maskElement = (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: palette.secondary },
      ]}
    >
      <Svg width={metrics.screenWidth} height={metrics.screenHeight}>
        <AnimatedPath d={d} fill={palette.primary} />
      </Svg>
    </View>
  );
  return (
    <MaskedView
      style={StyleSheet.absoluteFill}
      maskElement={maskElement}
    >
      {children}
    </MaskedView>
  );
};

export default Wave;
