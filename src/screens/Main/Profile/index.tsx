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
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  user: Object;
}

const ICON_SIZE = 30;

const Profile = (props: Props) => {
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
          icon={() => (
            <IconBackground size={ICON_SIZE}>
              <MaterialCommunityIcons
                name="settings"
                style={styles.icon}
              />
            </IconBackground>
          )}
        />
        <Option
          title="Email"
          icon={() => (
            <IconBackground size={ICON_SIZE}>
              <MaterialCommunityIcons
                name="settings"
                style={styles.icon}
              />
            </IconBackground>
          )}
        />
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
        <ItemDivider title="Preferences" />
        <Option
          title="Account settings"
          icon={() => (
            <IconBackground size={ICON_SIZE}>
              <MaterialCommunityIcons
                name="settings"
                style={styles.icon}
              />
            </IconBackground>
          )}
        />
        <Option
          title="Switch account"
          icon={() => (
            <IconBackground size={ICON_SIZE}>
              <MaterialCommunityIcons
                name="settings"
                style={styles.icon}
              />
            </IconBackground>
          )}
        />
        <Option
          title="Help"
          icon={() => (
            <IconBackground size={ICON_SIZE}>
              <MaterialCommunityIcons
                name="settings"
                style={styles.icon}
              />
            </IconBackground>
          )}
        />
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
    borderWidth: 4,
    borderColor: palette.primary,
  },
  icon: {
    color: palette.text.secondary,
    fontSize: typography.fontSize.medium,
  },
});

const mapStateToProps = state => {
  return {
    user: state.app.user,
  };
};

export default connect(mapStateToProps)(Profile);
