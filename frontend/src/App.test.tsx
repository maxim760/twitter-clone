import '@testing-library/jest-dom';
import React from "react";

import { server } from "./test/server"
import App from './App';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithRouterAndRedux } from './testUtils/renderWithRouterAndRedux';

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('routing', () => {
  test('show loader when data is loading', () => {
    renderWithRouterAndRedux(<App />,{},{route:"/"})
    const loader = screen.getByTestId("twitter-loading")
    expect(loader).toBeInTheDocument()
  });
  test('to HOME if data returned from server', async () => {
    renderWithRouterAndRedux(<App />,{
      user: {
        data: {
          _id: "string",
          email: "mail@gmail.ru",
          fullname: "max",
          username: "max",
          createdAt: "2020-12-19T11:57:24.915Z",
        },
      },
    },{route:"/"})
    const loader = screen.getByTestId("twitter-loading")
    const homePage = await screen.findByTestId("home-page")
    // screen.debug()
    expect(homePage).toBeInTheDocument()
  });
  test('to SIGNIN if data NOT returned from server', async () => {
    renderWithRouterAndRedux(<App />,{user:{data:undefined}},{route:"/"})
    const loader = screen.getByTestId("twitter-loading")
    await waitForElementToBeRemoved(loader)
    const signinPage = screen.getByTestId("signin-page")
    expect(signinPage).toBeInTheDocument()
});
  
})














// import App from "./App";
// import { useDispatch, Provider } from "react-redux";
// import { fetchUserData } from "./store/ducks/user/actionCreators";
// import { renderWithRedux } from "./testUtils/renderWithRedux";
// import userEvent from "@testing-library/user-event";
// import { renderWithRouter } from "./testUtils/renderWithRouter";
// import { createStore } from "redux";
// import { rootReducer } from "./store/rootReducer";
// import { createMemoryHistory } from "history";
// import { Router, MemoryRouter, Route } from "react-router-dom";
// import { render, screen } from "@testing-library/react";
// import { getByText } from "@testing-library/dom";
// import { FullTweet } from "./pages/Home/components/FullTweet";
// import { Switch } from "@material-ui/core";
// import { renderWithRouterAndRedux } from "./testUtils/renderWithRouterAndRedux";

// describe("Redux testing", () => {
//   describe("test routing", () => {
//     test("to home if isAuth", () => {
//       const { queryByTestId, getByTestId } = renderWithRouterAndRedux(
//         <App />,
        // {
        //   user: {
        //     data: {
        //       _id: "string",
        //       email: "mail@gmail.ru",
        //       fullname: "max",
        //       username: "max",
        //       createdAt: "2020-12-19T11:57:24.915Z",
        //     },
        //   },
        // },
//         { route: "/" }
//       );
//       const homePage = getByTestId(/homePage/i);
//       const signInPage = queryByTestId(/signInPage/i);
//       expect(homePage).toBeInTheDocument();
//       expect(signInPage).not.toBeInTheDocument();
//     });


//     test("to signin if not isAuth", () => {
//       const { queryByTestId, getByTestId } = renderWithRouterAndRedux(
//         <App />,
//         {
//           user: undefined,
//         },
//         { route: "/" }
//       );
//       const homePage = queryByTestId(/homePage/i);
//       const signInPage = getByTestId(/signInPage/i);
//       expect(signInPage).toBeInTheDocument();
//       expect(homePage).not.toBeInTheDocument();
//     });
//   });
// });
