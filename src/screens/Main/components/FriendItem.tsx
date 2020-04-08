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
  rightComponent?: React.Component;
  onPress: Function;
}

const LatestListItem = (props: Props) => {
  const { name, avatarUri, onPress } = props;
  const avtar = avatarUri ? avatarUri : globals.primaryAvatar;
  const RightComponent = props.rightComponent;
  return (
    <ListItem itemDivider={false} style={styles.listItem} avatar>
      <Touchable onPress={onPress} style={{ flexDirection: 'row' }}>
        <Left style={{ justifyContent: 'center' }}>
          <Thumbnail
            style={styles.mainAvatar}
            source={{
              uri: avtar,
            }}
          />
          <View style={styles.body}>
            <Text style={styles.mainText} numberOfLines={1}>
              {name}
            </Text>
          </View>
        </Left>
      </Touchable>

      <View style={styles.right}>
        {RightComponent && <RightComponent {...props} />}
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: palette.secondary,
    paddingBottom: metrics.margin.small,
    marginLeft: 0,
    paddingLeft: metrics.margin.medium,
  },
  mainAvatar: { width: 42, height: 42 },
  mainText: {
    fontSize: typography.fontSize.normal,
    color: palette.text.primary,
    width: 180,
  },

  body: {
    marginTop: metrics.margin.normal,
    marginLeft: metrics.margin.medium,
  },
  right: {
    flexGrow: 2,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: metrics.margin.medium,
  },
});

export default LatestListItem;
