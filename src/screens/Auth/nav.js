import { createSwitchNavigator } from "react-navigation";
import Loading from "./Loading";
import Login from "./Login";

export default createSwitchNavigator({
  loading: Loading,
  login: Login
});
