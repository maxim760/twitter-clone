import "@testing-library/jest-dom";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { AddTweetForm } from ".";
import { useHomeStyles } from "../../pages/Home/theme";
import { renderWithRedux } from "../../testUtils/renderWithRedux";
import { AddFormState } from "../../store/ducks/tweets/contracts/state";
import userEvent from "@testing-library/user-event";
const messageMore280Symbols = `qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq`;
describe("addTweetForm", () => {
  it("render IF ERROr", async () => {
    const { getByTestId } = renderWithRedux(<AddTweetForm rowsMax={10} />, {
      tweets: {
        addFormState: AddFormState.ERROR,
      },
    });
    const loader = screen.getByTestId("twitter-loading");
    await waitForElementToBeRemoved(loader);
    screen.debug();
    expect(getByTestId("snackbar")).toBeInTheDocument();
  });
  it("render IF loading", async () => {
    const { getByTestId, getByRole } = renderWithRedux(
      <AddTweetForm rowsMax={10} />,
      {
        tweets: {
          addFormState: AddFormState.LOADING,
        },
      }
    );
    expect(getByTestId("addTweet")).toBeInTheDocument();
    expect(getByTestId("addTweet")).toBeDisabled();
    expect(getByRole("loading")).toBeInTheDocument();
  });
  it("change text and button is not disabled", async () => {
    renderWithRedux(<AddTweetForm rowsMax={10} />, {
      tweets: {
        addFormState: AddFormState.NEVER,
      },
    });
    const textarea = screen.getByTestId("tweetArea");
    userEvent.type(textarea, "hello");
    expect(textarea).toHaveTextContent("hello");
    expect(screen.getByTestId("addTweet")).not.toBeDisabled();
  });
  it("change text more 280 sym and button is disabled", async () => {
    renderWithRedux(<AddTweetForm rowsMax={10} />, {
      tweets: {
        addFormState: AddFormState.NEVER,
      },
    });
    const textarea = screen.getByTestId("tweetArea");
    userEvent.type(textarea, messageMore280Symbols);
    expect(screen.getByTestId("addTweet")).toBeDisabled();
  });
  it("click button", async () => {
    renderWithRedux(<AddTweetForm rowsMax={10} />, {
      tweets: {
        addFormState: AddFormState.NEVER,
      },
    });
    const textarea = screen.getByTestId("tweetArea");
    const button = screen.getByTestId("addTweet");
    userEvent.type(textarea, "hello");
    userEvent.click(button);
    expect(textarea).not.toHaveTextContent("hello");
    expect(screen.getByTestId("addTweet")).toBeDisabled();
  });
});
