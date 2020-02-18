import React from 'react';
import { View, StyleSheet } from 'react-native';
import palette from '_palette';

interface Props {
  iconComponent: React.Component;
}

const TabBarButton = (props: Props) => {
  const IconComponent = props.iconComponent;
  return (
    <View style={styles.container}>
      <IconComponent size={32} color={palette.text.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});

export default TabBarButton;
