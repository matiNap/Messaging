import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Header, Left, Thumbnail, Right } from 'native-base';
import palette from '_palette';
import metrics from '_metrics';
import typography from '_typography';
import { Ionicons } from '@expo/vector-icons';
import IconBackground from '_components/IconBackground';
import StatusBar from '_components/StatusBar';
import Touchable from '_components/Touchable';
import { navigate } from '_navigation';
import globals from '_globals';
import BadgeButton from './BadgeButton';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';

interface Props {
  title?: string;
  requestValue: number;
}

const MainHeader = (props: Props) => {
  const { title, requestValue } = props;

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
        <BadgeButton
          color={palette.actions.error}
          size={35}
          value={requestValue}
          onPress={() => {
            navigate('friendAdd');
          }}
          buttonComponent={() => (
            <IconBackground size={40}>
              <Ionicons
                name="ios-person-add"
                size={35}
                color={palette.secondary}
              />
            </IconBackground>
          )}
        />
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

const mapStateToProps = (state: RootState) => {
  return {
    requestValue: state.notifications.friendRequests.length,
  };
};

export default connect(mapStateToProps)(MainHeader);
