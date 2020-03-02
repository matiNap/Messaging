import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Text, Left, Body } from 'native-base';
import palette from '_palette';
import typography from '_typography';
import metrics from '_metrics';
import Touchable from '_components/Touchable';

interface Props {
  title: string;
  icon: React.Component;
  subText: string;
}

const Option = (props: Props) => {
  const { title, subText } = props;
  const Icon = props.icon;
  return (
    <ListItem avatar>
      <Left>{Icon && <Icon />}</Left>
      <Body>
        <Text style={styles.text}> {title}</Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  text: {
    color: palette.text.primary,
    fontSize: typography.fontSize.medium,
    marginLeft: metrics.margin.small,
  },
  subText: {
    fontSize: typography.fontSize.small,
    color: palette.grayscale.medium,
    marginLeft: metrics.margin.normal,
  },
});

export default Option;
