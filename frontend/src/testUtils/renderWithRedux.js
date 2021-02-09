import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { rootReducer } from "../store/rootReducer";
import { TwitterBird } from "../components";

export const renderWithRedux = (component, state = {}) => {
  const store = createStore(rootReducer, state);
  return {
    ...render(
      <Provider store={store}>
        <React.Suspense fallback={<TwitterBird />}>{component}</React.Suspense>
      </Provider>
    ),
    store,
  };
};
