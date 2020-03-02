import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import palette from '_palette';
import typography from '_typography';
import Touchable from '_components/Touchable';

interface Props {
  iconComponent: React.Component;
  backgroundColor: string;
  onPress: Function;
}
//Notification size
const NOT_SIZE = 22;
const ICON_SIZE = 35;

const TabBarButton = (props: Props) => {
  const IconComponent = props.iconComponent;
  const { backgroundColor, onPress } = props;
  return (
    <View style={styles.container}>
      <Touchable onPress={onPress}>
        <View style={{ marginTop: 10 }}>
          <View style={[styles.circle, { backgroundColor }]}>
            <Text style={styles.info}>{4}</Text>
          </View>
          <IconComponent
            size={ICON_SIZE}
            color={palette.text.primary}
          />
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
  circle: {
    width: NOT_SIZE,
    height: NOT_SIZE,
    borderRadius: NOT_SIZE,
    backgroundColor: palette.actions.succes,
    position: 'absolute',
    justifyContent: 'center',
    translateX: ICON_SIZE * 0.6,
    translateY: -ICON_SIZE * 0.04,
    borderWidth: 3,
    borderColor: palette.secondary,
  },
  info: {
    fontSize: typography.fontSize.small,
    alignSelf: 'center',
    color: palette.text.secondary,
  },
});

export default TabBarButton;
