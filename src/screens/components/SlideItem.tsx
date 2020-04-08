import React, { CSSProperties } from 'react';
import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';
import { View } from 'react-native';
import { timing } from 'react-native-redash';
import palette from '_palette';

interface Props {
  style?: CSSProperties;
  rightComponent: React.Component;
}

const {
  block,
  greaterOrEq,
  lessOrEq,
  cond,
  Value,
  event,
  eq,
  and,
  set,
  greaterThan,
} = Animated;

export default class SlideItem extends React.Component<Props> {
  translationX: Animated.Value<0>;
  offsetX: Animated.Value<0>;
  _gestureHandler: (...args: any[]) => void;
  constructor(props: Props) {
    super(props);
    this.translationX = new Value(0);
    this.gestureState = new Value(State.END);

    this._gestureHandler = event([
      {
        nativeEvent: {
          translationX: this.translationX,
          state: this.gestureState,
        },
      },
    ]);
    this.offsetX = new Value(0);
  }
  render() {
    const { style, rightComponent } = this.props;

    return (
      <View
        style={[style, { backgroundColor: palette.actions.error }]}
      >
        <Animated.Code>
          {() =>
            block([
              cond(
                eq(this.gestureState, State.ACTIVE),
                cond(
                  and(
                    lessOrEq(this.offsetX, 0),
                    greaterThan(this.translationX, 0),
                  ),

                  set(this.offsetX, 0),

                  set(this.offsetX, this.translationX),
                ),
              ),

              cond(
                eq(this.gestureState, State.END),
                cond(
                  lessOrEq(this.translationX, -30),
                  set(
                    this.offsetX,
                    timing({
                      duration: 100,
                      from: this.translationX,
                      to: -90,
                      easing: Easing.inOut(Easing.ease),
                    }),
                  ),
                  cond(
                    greaterOrEq(this.translationX, 70),
                    set(
                      this.offsetX,
                      timing({
                        duration: 100,
                        from: this.translationX,
                        to: 0,
                        easing: Easing.inOut(Easing.ease),
                      }),
                    ),
                  ),
                ),
              ),
            ])
          }
        </Animated.Code>
        <View style={{ position: 'absolute', right: 30, top: 15 }}>
          {rightComponent && rightComponent()}
        </View>
        <PanGestureHandler
          onGestureEvent={this._gestureHandler}
          onHandlerStateChange={this._gestureHandler}
        >
          <Animated.View
            style={{
              translateX: this.offsetX,
            }}
          >
            {this.props.children}
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}
