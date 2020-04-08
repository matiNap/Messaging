import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { View } from 'native-base';

import SignUp from './SignUp';
import Wave from './components/Wave';
import SignIn from './SignIn';
import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import metrics from '_metrics';
import palette from '_palette';
import {
  waveSwipeY,
  waveHorizontalRadius,
  waveVerticalRadius,
  followPointer,
  getProgress,
} from './animationHelpers';
import { runTiming } from '_helpers/animations';

const { event, Value, sub, set, interpolate } = Animated;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.back = new Value(0);
    this.x = new Value(metrics.screenWidth / 2);
    this.y = new Value(0);
    this.velocityY = new Value(0);
    this.pageX = new Value(metrics.screenWidth / 2);
    this.pageY = new Value(0);
    this.opened = new Value(0);

    this.gestureState = new Value(State.UNDETERMINED);
    this.gestureHandler = event([
      {
        nativeEvent: {
          translationX: this.x,
          translationY: this.y,
          velocityY: this.velocityY,
          x: this.pageX,
          y: this.pageY,
          state: this.gestureState,
        },
      },
    ]);
  }
  render() {
    const swipeY = waveSwipeY(
      this.gestureState,
      this.y,
      this.opened,
      this.back,
    );
    const { svgHeight } = metrics.login;
    const waveHeight = svgHeight / 2;
    const centerX = followPointer(this.pageX);
    const progress = getProgress(swipeY);
    const verticalRadius = waveVerticalRadius(
      progress,
      this.gestureState,
      this.opened,
    );
    const horizontalRadius = waveHorizontalRadius(
      progress,
      this.gestureState,
      this.opened,
    );

    return (
      <View style={{ flex: 1 }} behavior="padding">
        <PanGestureHandler
          onGestureEvent={this.gestureHandler}
          onHandlerStateChange={this.gestureHandler}
        >
          <Animated.View style={{ flex: 1 }}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              enabled
            >
              <SignIn
                translateY={sub(swipeY, metrics.screenHeight)}
              />

              <SignUp
                translateY={swipeY}
                backToSignIn={() => {
                  this.back.setValue(1);
                  this.opened.setValue(0);
                }}
              />

              <Wave
                centerX={centerX}
                waveHeight={waveHeight}
                opened={this.opened}
                horizontalRadius={horizontalRadius}
                verticalRadius={verticalRadius}
                swipeY={swipeY}
                fillColor={palette.primary}
              />
            </KeyboardAvoidingView>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Login;
