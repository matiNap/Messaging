import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
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

const LatestButton = (props: Props) => {
  const { iconSize, checked } = props;
  return (
    <BadgeButton
      onPress={() => {
        navigate('latest');
        props.pressTabBarButton('latest');
      }}
      size={iconSize}
      value={4}
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

const mapStateToProps = (state: RootState) => {
  return {
    checked: state.app.tabButtonChecked['latest'],
  };
};

export default connect(mapStateToProps, { pressTabBarButton })(
  LatestButton,
);
