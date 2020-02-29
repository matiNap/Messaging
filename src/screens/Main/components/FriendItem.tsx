import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, ListItem, Thumbnail, Left } from 'native-base';
import palette from '_palette';
import metrics from '_metrics';
import typography from '_typography';
import Touchable from '_components/Touchable';
import globals from '_globals';

interface Props {
  name: string;
  avatarUri: string;
  noTouch: boolean;
  rightComponent?: React.Component;
  onPress: Function;
}

const LatestListItem = (props: Props) => {
  const { name, avatarUri, noTouch, onPress } = props;
  const avtar = avatarUri ? avatarUri : globals.primaryAvatar;
  const RightComponent = props.rightComponent;
  const Content = () => (
    <ListItem itemDivider={false} style={styles.listItem} avatar>
      <Left>
        <Thumbnail
          style={styles.mainAvatar}
          source={{
            uri: avtar,
          }}
        />
      </Left>
      <View style={styles.body}>
        <Text style={styles.mainText}>{name}</Text>
      </View>
      <View style={styles.right}>
        {RightComponent && <RightComponent {...props} />}
      </View>
    </ListItem>
  );
  if (noTouch) {
    return <Content />;
  } else {
    return (
      <Touchable onPress={() => {}}>
        <Content />
      </Touchable>
    );
  }
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: palette.secondary,
    marginTop: metrics.margin.normal,
    flexDirection: 'row',
  },
  mainAvatar: { width: 42, height: 42 },
  mainText: {
    fontSize: typography.fontSize.normal,
    color: palette.text.primary,
  },

  body: {
    marginTop: metrics.margin.normal,
    marginLeft: metrics.margin.medium,
    width: '65%',
  },
  right: {
    flexGrow: 2,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: metrics.margin.medium,
  },
});

export default LatestListItem;
