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
}

const OnlineButton = (props: Props) => {
  const { iconSize, checked } = props;
  return (
    <BadgeButton
      onPress={() => {
        navigate('online');
        props.pressTabBarButton('online');
      }}
      size={iconSize}
      value={4}
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
  };
};

export default connect(mapStateToProps, { pressTabBarButton })(
  OnlineButton,
);
