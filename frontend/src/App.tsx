import React from "react";
import { SignIn } from "./pages/Signin";
import { Home } from "./pages/Home";
import {useLocation} from "react-router"
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthApi } from "./services/api/authApi";
import { setUserData, fetchUserData } from "./store/ducks/user/actionCreators";
import TwitterIcon from "@material-ui/icons/Twitter";

import {
  selectIsAuth,
  selectUserData,
  selectUserisLoaded,
  selectUserLoadingStatus,
  selectIsReady,
} from "./store/ducks/user/selectors";
import { LoadingStatus } from "./store/types";
import { User } from "./pages/User";
import { TwitterBird } from "./components/TwitterBird";

const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()
  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectUserLoadingStatus);
  const isReady = useSelector(selectIsReady)

  React.useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  React.useLayoutEffect(() => {
    if (isAuth && isReady && (location.pathname.includes("signin") || location.pathname === "/")) {
      history.push("/home");
    } else if(!isAuth && isReady /*(location.pathname.includes("home") || location.pathname === "/")*/) {
      history.push("/signin");
    }
  }, [isAuth, isReady]);

  if (!isReady) {
    return <TwitterBird />
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/user" component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    </div>
  );
};

export default App;
