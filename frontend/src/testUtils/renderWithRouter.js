import React from "react";
import { withRouter, useLocation, useHistory } from "react-router";
import { Link, Route, Router, Switch, useParams } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, screen, findByTestId, queryByTestId } from "@testing-library/react";


export const renderWithRouter = (
  component,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(component, { wrapper: Wrapper }),
    history,
  };
};
