import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import palette from '_palette';
import { navigate } from 'navigationService';
import BadgeButton from './BadgeButton';
import { connect } from 'react-redux';
import { pressTabBarButton } from '_actions/creators/app';
import { RootState } from '_rootReducer';

interface Props {
  iconSize: number;
  pressTabBarButton: typeof pressTabBarButton;
  checked: boolean;
  onlineValue: number;
}

const OnlineButton = (props: Props) => {
  const { iconSize, checked, onlineValue } = props;
  return (
    <BadgeButton
      onPress={() => {
        navigate('online');
        props.pressTabBarButton('online');
      }}
      size={iconSize}
      value={onlineValue}
      color={palette.primary}
      buttonComponent={() => {
        return (
          <Ionicons
            name="ios-person"
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

const mapStateToProps = (state: RootState) => {
  return {
    checked: state.app.tabButtonChecked['online'],
    onlineValue: state.users.friendsOnline.length,
  };
};

export default connect(mapStateToProps, { pressTabBarButton })(
  OnlineButton,
);
