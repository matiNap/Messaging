import { createAppContainer, createSwitchNavigator } from "react-navigation";

import authNav from "./Auth/nav";

const navigator = createSwitchNavigator({
  auth: authNav
});

export default createAppContainer(navigator);
