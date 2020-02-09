import { createSwitchNavigator } from "react-navigation";
import Loading from "./Loading";
import Login from "./Login";

export default createSwitchNavigator({
  login: Login,
  loading: Loading
});
