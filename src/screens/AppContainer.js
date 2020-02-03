import { createAppContainer, createSwitchNavigator } from "react-navigation";

import screen1Nav from "./Main/Screen1/nav";
import screen2Nav from "./Main/Screen2/nav";

const navigator = createSwitchNavigator({
  screen1: screen1Nav,
  screen2: screen2Nav
});

export default createAppContainer(navigator);
