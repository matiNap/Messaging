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
import IconBackground from '_components/IconBackground';
import StatusBar from '_components/StatusBar';
import Touchable from '_components/Touchable';
import Profile from '../Profile';
import { navigate } from '_navigation';

interface Props {
  title?: string;
  iconName: string;
}

const MainHeader = (props: Props) => {
  const { title, iconName } = props;

  return (
    <Header style={styles.header}>
      <StatusBar />
      <Touchable
        onPress={() => {
          navigate('profile');
        }}
      >
        <Thumbnail
          source={{
            uri:
              'https://ramcotubular.com/wp-content/uploads/default-avatar.jpg',
          }}
          style={styles.avatar}
        />
      </Touchable>

      <Text style={styles.title}>{title}</Text>

      <Right>
        <Touchable>
          <IconBackground size={37}>
            <MaterialCommunityIcons
              name={iconName}
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
    alignSelf: 'center',
    borderColor: palette.text.primary,
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
