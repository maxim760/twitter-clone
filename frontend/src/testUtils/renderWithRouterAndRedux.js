import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { withRouter, useLocation, useHistory } from "react-router";
import {
  Link,
  Route,
  Router,
  Switch,
  useParams,
  BrowserRouter,
} from "react-router-dom";
import { rootReducer } from "../store/rootReducer";
import { createMemoryHistory } from "history";
import {TwitterBird} from "../components"
import {
  render,
  fireEvent,
  screen,
  findByTestId,
  queryByTestId,
} from "@testing-library/react";

export const renderWithRouterAndRedux = (
  component,
  state = {},
  { route = "/" } = {}
) => {
  const store = createStore(rootReducer, state);
  window.history.pushState({}, "title", route);
  const Wrapper = ({ children }) => (
    <BrowserRouter history={history}>{children}</BrowserRouter>
  );
  return {
    ...render(
      <Provider store={store}>
        <React.Suspense fallback={<TwitterBird />}>{component}</React.Suspense>
      </Provider>,
      {
        wrapper: Wrapper,
      }
    ),
    store,
    history,
  };
};
