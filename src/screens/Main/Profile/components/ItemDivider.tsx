import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Text } from 'native-base';
import palette from '_palette';
import typography from '_typography';

interface Props {
  title: string;
}

const ItemDivider = (props: Props) => {
  const { title } = props;
  return (
    <ListItem itemDivider style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.secondary,
  },
  text: {
    color: palette.grayscale.medium,
    fontSize: typography.fontSize.small,
  },
});

export default ItemDivider;
