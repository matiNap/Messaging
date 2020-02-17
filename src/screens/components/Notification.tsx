import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import * as Animatable from 'react-native-animatable';
import typography from '_typography';
import palette from '_palette';
import metrics from '_metrics';
import Animated from 'react-native-reanimated';

const getBackgroundColor = (type: string | undefined) => {
  switch (type) {
    case 'success':
      return palette.actions.warning;
    case 'warning':
      return palette.actions.warning;
    case 'error':
      return palette.actions.error;
    default:
      return palette.secondary;
  }
};

interface Props {
  content: string;
  type?: 'warning' | 'error' | 'success';
  color?: string | Animated.Node<string>;
  hide?: boolean;
}

class Notification extends React.Component<Props> {
  animationRef: Animatable.View;

  componentDidUpdate() {
    const { hide } = this.props;
    if (hide) {
      this.onExit();
    }
  }

  onExit = () => {
    if (this.animationRef) this.animationRef.slideOutDown(200);
  };

  render() {
    const { content, type, color, hide } = this.props;
    const backgroundColor = color ? color : getBackgroundColor(type);
    return (
      <View style={{ position: 'absolute', bottom: 0 }}>
        {!hide && (
          <Animatable.View
            style={styles.container}
            animation="slideInUp"
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
        )}
      </View>
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
  },
  text: {
    color: palette.text.secondary,
    fontSize: typography.fontSize.small,
    alignSelf: 'center',
    margin: 10,
  },
});

export default Notification;
