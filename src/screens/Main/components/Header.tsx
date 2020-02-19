import React from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  Header,
  Left,
  Thumbnail,
  Right,
  Icon,
} from 'native-base';
import palette from '_palette';
import metrics from '_metrics';
import typography from '_typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  title?: string;
  iconName: string;
}

const MainHeader = (props: Props) => {
  const { title, iconName } = props;
  return (
    <Header style={styles.header}>
      <Thumbnail
        source={{
          uri:
            'https://ramcotubular.com/wp-content/uploads/default-avatar.jpg',
        }}
        style={styles.avatar}
      />

      <Text style={styles.title}>{title}</Text>

      <Right>
        <MaterialCommunityIcons
          name="settings"
          size={35}
          color={palette.text.primary}
        />
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 43,
    height: 43,
    alignSelf: 'center',
    borderColor: palette.text.primary,
  },
  header: {
    paddingTop: metrics.padding.medium,
    height: 65 + metrics.statusBarHeight,
    backgroundColor: palette.secondary,
    borderBottomColor: palette.grayscale.medium,
    borderBottomWidth: 0.43,
  },
  left: {
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: typography.fontSize.big,
    alignSelf: 'center',
    marginLeft: metrics.margin.normal,
    color: palette.text.primary,
  },
});

export default MainHeader;
