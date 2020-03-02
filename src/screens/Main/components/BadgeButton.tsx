import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import palette from '_palette';
import typography from '_typography';
import Touchable from '_components/Touchable';

interface Props {
  buttonComponent: React.Component;
  onPress: Function;
  value: number;
  size: number;
  color: string;
}
//Notification size
const NOT_SIZE = 22;

const BadgeButton = (props: Props) => {
  const ButtonComponent = props.buttonComponent;
  const { onPress, color, value, size } = props;
  return (
    <View style={styles.container}>
      <Touchable onPress={onPress}>
        <View>
          <ButtonComponent />
          {value !== 0 && (
            <View
              style={[
                {
                  width: NOT_SIZE,
                  height: NOT_SIZE,
                  borderRadius: NOT_SIZE,
                  position: 'absolute',
                  justifyContent: 'center',
                  translateX: size * 0.6,
                  translateY: -size * 0.04,
                  borderWidth: 2,
                  borderColor: palette.secondary,
                  backgroundColor: color,
                },
              ]}
            >
              <Text style={styles.info}>{value}</Text>
            </View>
          )}
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: 50,
    justifyContent: 'center',
  },
  circle: {},
  info: {
    fontSize: typography.fontSize.small,
    alignSelf: 'center',
    color: palette.text.secondary,
  },
});

export default BadgeButton;
