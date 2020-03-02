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
  Body,
} from 'native-base';
import palette from '_palette';
import metrics from '_metrics';
import typography from '_typography';
import { Ionicons } from '@expo/vector-icons';
import IconBackground from '_components/IconBackground';
import StatusBar from '_components/StatusBar';
import Touchable from '_components/Touchable';
import { navigate } from '_navigation';
import globals from '_globals';

interface Props {
  title?: string;
}

const MainHeader = (props: Props) => {
  const { title } = props;

  return (
    <Header style={styles.header}>
      <StatusBar />
      <Left style={{ flexDirection: 'row' }}>
        <Touchable
          onPress={() => {
            navigate('profile');
          }}
          style={styles.avatar}
        >
          <Thumbnail
            style={styles.avatar}
            source={{
              uri: globals.primaryAvatar,
            }}
          />
        </Touchable>
        <Text style={styles.title}>{title}</Text>
      </Left>

      <Right>
        <Touchable
          onPress={() => {
            navigate('friendAdd');
          }}
        >
          <IconBackground size={37}>
            <Ionicons
              name="ios-person-add"
              size={30}
              color={palette.secondary}
            />
          </IconBackground>
        </Touchable>
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 43,
    height: 43,
  },
  header: {
    paddingTop: metrics.padding.medium,
    height: 65 + metrics.statusBarHeight,
    backgroundColor: palette.secondary,
    borderBottomColor: palette.grayscale.light,
    borderBottomWidth: 0.3,
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
