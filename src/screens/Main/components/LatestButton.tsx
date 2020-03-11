import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import palette from '_palette';
import { navigate } from 'navigationService';
import BadgeButton from './BadgeButton';
import { connect } from 'react-redux';
import { pressTabBarButton } from '_actions/creators/app';
import { RootState } from '_rootReducer';
import _ from 'lodash';
import reactotron from 'reactotronConfig';

interface Props {
  iconSize: number;
  pressTabBarButton: typeof pressTabBarButton;
  checked: boolean;
  valu: number;
}

const LatestButton = (props: Props) => {
  const { iconSize, checked, value } = props;
  return (
    <BadgeButton
      onPress={() => {
        navigate('latest');
        props.pressTabBarButton('latest');
      }}
      size={iconSize}
      value={value}
      color={palette.actions.succes}
      buttonComponent={() => {
        return (
          <MaterialCommunityIcons
            name="email"
            size={iconSize}
            color={
              !checked ? palette.text.primary : palette.grayscale.dark
            }
          />
        );
      }}
    />
  );
};

const countMessages = (chats: any, myUid: string) => {
  const chatsArray = Object.values(chats);
  let c = 0;
  for (const currentChat of chatsArray) {
    const { toRead, latestMessage } = currentChat;
    reactotron.log(latestMessage.sendedBy, myUid);
    if (latestMessage.sendedBy !== myUid) {
      const diff = latestMessage.createdAt.getTime() - toRead;
      if (diff >= 0) c++;
    }
  }

  return c;
};

const mapStateToProps = (state: RootState) => {
  return {
    checked: state.app.tabButtonChecked['latest'],
    value: state.chat.chats
      ? countMessages(state.chat.chats, state.app.user.uid)
      : 0,
  };
};

export default connect(mapStateToProps, { pressTabBarButton })(
  LatestButton,
);
