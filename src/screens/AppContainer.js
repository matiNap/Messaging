import { createAppContainer, createSwitchNavigator } from "react-navigation";

import screen2Nav from "./Main/Screen2/nav";
import authNav from "./Auth/nav";

const navigator = createSwitchNavigator({
  auth: authNav,
  main: screen2Nav
});

export default createAppContainer(navigator);
