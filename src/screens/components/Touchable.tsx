import React, { CSSProperties } from 'react';
import { Animated } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Easing } from 'react-native-reanimated';

interface Props {
  onPress?: Function;
  style?: CSSProperties;
}

export default class Touchable extends React.Component<Props> {
  opacity: Animated.Value;
  constructor(props: Props) {
    super(props);
    this.opacity = new Animated.Value(1);
  }
  render() {
    const { children, onPress, style } = this.props;
    const opacity = this.opacity.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [1, 0.7, 1],
    });
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Animated.timing(this.opacity, {
            duration: 500,
            toValue: 0,
            easing: Easing.linear,
          }).start(() => {
            this.opacity.setValue(1);
          });
          if (onPress) onPress();
        }}
      >
        <Animated.View
          style={[
            style,
            {
              opacity: opacity,
            },
          ]}
        >
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
