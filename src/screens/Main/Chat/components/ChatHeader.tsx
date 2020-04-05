import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { Header, Right } from 'native-base';
import Back from '_components/Back';
import palette from '_palette';
import metrics from '_metrics';
import typography from '_typography';
import { Entypo } from '@expo/vector-icons';
import Touchable from '_components/Touchable';
import { useNavigation } from '@react-navigation/native';

interface Props {
  name: string;
  displayName: string;
}

const ChatHeader = (props: Props) => {
  const { name, displayName } = props;
  const navigation = useNavigation();
  StatusBar.setTranslucent(true);
  return (
    <Header
      style={styles.header}
      androidStatusBarColor={'rgba(0,0,0,0)'}
      iosBarStyle="light-content"
    >
      <View style={styles.leftContainer}>
        <View style={{ alignSelf: 'center' }}>
          <Back
            style={styles.back}
            onPress={() => {
              StatusBar.setBarStyle('dark-content');
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.mainText} numberOfLines={1}>
            {name}
          </Text>

          <Text style={styles.subText}>{displayName}</Text>
        </View>
      </View>

      <Right>
        <Touchable>
          <Entypo
            name="dots-three-vertical"
            style={styles.menuIcon}
          />
        </Touchable>
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 65 + metrics.statusBarHeight,
    paddingTop: metrics.statusBarHeight,
    backgroundColor: palette.primary,
    borderBottomColor: palette.grayscale.light,
    borderBottomWidth: 0.3,
  },
  leftContainer: {
    flexDirection: 'row',
    marginTop: metrics.margin.small,
    justifyContent: 'center',
  },
  back: {
    color: palette.text.secondary,
    padding: 5,
  },
  nameContainer: {
    flexDirection: 'column',
    marginLeft: metrics.margin.medium,
    width: 100,
  },
  mainText: {
    fontSize: typography.fontSize.medium,
    color: palette.text.secondary,
  },
  subText: {
    fontSize: typography.fontSize.small,
    color: palette.grayscale.medium,
  },
  menuIcon: {
    color: palette.text.secondary,
    fontSize: 27,
  },
});

export default ChatHeader;
