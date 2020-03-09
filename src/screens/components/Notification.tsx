import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import * as Animatable from 'react-native-animatable';
import typography from '_typography';
import palette from '_palette';
import metrics from '_metrics';
import Animated from 'react-native-reanimated';

interface Props {
  content: string;
  color?: string | Animated.Node<string>;
  duration: number | null;
}

class Notification extends React.Component<Props> {
  animationRef: Animatable.View;

  state = {
    color: null,
    content: null,
  };

  constructor(props: Props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(
    content: string,
    settings: {
      duration: 'default' | null | number;
      color?: undefined | string | Animated.Value<string>;
    },
  ) {
    const duration = settings.duration
      ? this.props.duration
      : settings.duration;
    this.setState({ content, color: settings.color });
    if (duration) {
      this.animationRef.slideInUp(200);
      setTimeout(() => {
        this.animationRef.slideOutDown(200);
      }, this.props.duration);
    } else {
      this.animationRef.slideInUp(200);
    }
  }

  close(
    content: string,
    settings: {
      duration: 'default' | null | number;
      color?: undefined | string | Animated.Value<string>;
    },
  ) {
    const duration =
      settings.duration === 'default'
        ? this.props.duration
        : settings.duration;
    if (content) this.setState({ content });
    if (duration) {
      setTimeout(() => {
        this.animationRef.slideOutDown(200);
      }, this.props.duration);
    } else {
      this.animationRef.slideOutDown(200);
    }
  }

  render() {
    const backgroundColor = this.state.color
      ? this.state.color
      : this.props.color;
    const content = this.state.content
      ? this.state.content
      : this.props.content;
    return (
      <Animatable.View
        style={styles.container}
        ref={ref => {
          this.animationRef = ref;
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            display: 'flex',
            backgroundColor,
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Text style={styles.text}>{content}</Text>
        </Animated.View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: metrics.screenWidth,
    height: 40,
    shadowRadius: 2,
    shadowColor: 'rgba(31,31,31,0.7)',
    shadowOffset: { x: 0, y: -1 },
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    color: palette.text.secondary,
    fontSize: typography.fontSize.small,
    alignSelf: 'center',
    margin: 10,
  },
});

export default Notification;
