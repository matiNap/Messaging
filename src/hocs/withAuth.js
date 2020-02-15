import React from "react";
import { withNavigation } from "react-navigation";
import { Container, View } from "native-base";

export const withAuthHoc = Child => {
  class WithAuth extends React.Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
          <Child {...this.props} />
        </View>
      );
    }
  }
  return withNavigation(WithAuth);
};

export default withAuthHoc;
