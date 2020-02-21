import React from 'react';
import { StyleSheet } from 'react-native';
import { List, Text, Thumbnail } from 'native-base';
import * as Animatable from 'react-native-animatable';
import palette from '_palette';
import metrics from '_metrics';
import ItemDivider from './components/ItemDivider';
import Option from './components/Option';
import { connect } from 'react-redux';
import typography from '_typography';
import IconBackground from '_components/IconBackground';
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  AntDesign,
} from '@expo/vector-icons';
import Touchable from '_components/Touchable';

interface Props {
  user: Object;
}

const ICON_SIZE = 30;

const Profile = (props: Props) => {
  const { user } = props;
  const { displayName, email } = user;
  return (
    <Animatable.View
      style={[StyleSheet.absoluteFill, styles.container]}
      animation="fadeIn"
      duration={300}
    >
      <Thumbnail
        source={{
          uri:
            'https://ramcotubular.com/wp-content/uploads/default-avatar.jpg',
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Mateusz Napieralski</Text>

      <List>
        <ItemDivider title="Informations" />
        <Option
          title="Username"
          subText={displayName}
          icon={() => (
            <IconBackground size={ICON_SIZE} color="#eb4034">
              <Ionicons name="ios-person" style={styles.icon} />
            </IconBackground>
          )}
        />
        <Option
          title="Email"
          subText={email}
          icon={() => (
            <IconBackground size={ICON_SIZE} color={palette.primary}>
              <AntDesign name="mail" style={styles.icon} />
            </IconBackground>
          )}
        />

        <ItemDivider title="Preferences" />
        <Touchable>
          <Option
            title="Status"
            icon={() => (
              <IconBackground
                size={ICON_SIZE}
                color={palette.actions.succes}
              >
                <AntDesign name="login" style={styles.icon} />
              </IconBackground>
            )}
          />
        </Touchable>
        <Touchable>
          <Option
            title="Account settings"
            icon={() => (
              <IconBackground size={ICON_SIZE} color="#e8c00c">
                <MaterialCommunityIcons
                  name="settings"
                  style={styles.icon}
                />
              </IconBackground>
            )}
          />
        </Touchable>

        <Touchable>
          <Option
            title="Switch account"
            icon={() => (
              <IconBackground size={ICON_SIZE} color="#0991e6">
                <FontAwesome name="refresh" style={styles.icon} />
              </IconBackground>
            )}
          />
        </Touchable>
        <Touchable>
          <Option
            title="Help"
            icon={() => (
              <IconBackground size={ICON_SIZE}>
                <AntDesign
                  name="
                infocirlceo"
                  style={styles.icon}
                />
              </IconBackground>
            )}
          />
        </Touchable>
        <Touchable>
          <Option
            title="Status"
            icon={() => (
              <IconBackground
                size={ICON_SIZE}
                color={palette.grayscale.light}
              >
                <MaterialCommunityIcons
                  name="settings"
                  style={styles.icon}
                />
              </IconBackground>
            )}
          />
        </Touchable>
        <Touchable>
          <Option
            title="Status"
            icon={() => (
              <IconBackground size={ICON_SIZE}>
                <MaterialCommunityIcons
                  name="settings"
                  style={styles.icon}
                />
              </IconBackground>
            )}
          />
        </Touchable>
      </List>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.secondary,
    paddingTop: metrics.statusBarHeight,
  },
  name: {
    color: palette.text.primary,
    fontSize: typography.fontSize.big,
    marginVertical: metrics.margin.normal,
    alignSelf: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120,
    alignSelf: 'center',
    marginTop: metrics.margin.big,
    borderWidth: 5.5,
    borderColor: palette.primary,
  },
  icon: {
    color: palette.secondary,
    fontSize: typography.fontSize.medium,
  },
});

const mapStateToProps = state => {
  return {
    user: state.app.user,
  };
};

export default connect(mapStateToProps)(Profile);
