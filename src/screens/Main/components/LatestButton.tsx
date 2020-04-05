import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import palette from '_palette';
import BadgeButton from './BadgeButton';
import { connect } from 'react-redux';
import { pressTabBarButton } from '_actions/creators/app';
import { RootState } from '_rootReducer';
import _ from 'lodash';

interface Props {
  iconSize: number;
  pressTabBarButton: typeof pressTabBarButton;
  checked: boolean;
  value: number;
}

const LatestButton = (props: Props) => {
  const { iconSize, checked, value } = props;
  return (
    <BadgeButton
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

const countMessages = (chats: any) => {
  const chatsArray = Object.values(chats);
  let c = 0;
  for (const currentChat of chatsArray) {
    const { readed } = currentChat;
    if (readed) {
      const { byMe } = readed;
      if (byMe) c++;
    }
  }

  return c;
};

const mapStateToProps = (state: RootState) => {
  return {
    value: state.chat.chats ? countMessages(state.chat.chats) : 0,
  };
};

export default connect(mapStateToProps)(LatestButton);
