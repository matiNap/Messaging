import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Text, Left, Body } from 'native-base';
import palette from '_palette';
import typography from '_typography';
import metrics from '_metrics';

interface Props {
  title: string;
  icon: React.Component;
}

const Option = (props: Props) => {
  const { title } = props;
  const Icon = props.icon;
  return (
    <ListItem avatar>
      <Left>{Icon && <Icon />}</Left>
      <Body>
        <Text style={styles.text}> {title}</Text>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  text: {
    color: palette.text.primary,
    fontSize: typography.fontSize.medium,
    margin: metrics.margin.small,
  },
});

export default Option;
