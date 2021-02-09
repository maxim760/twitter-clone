import "@testing-library/jest-dom";
import React from "react";
import { UserModal } from ".";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { renderWithRedux } from "../../../../testUtils/renderWithRedux";
import userEvent from "@testing-library/user-event";

describe("user Modal", () => {
  test("return userModal", async () => {
    let isOpen = true;
    const handleClose = jest.fn().mockImplementation(() => {
      isOpen = false;
      return isOpen;
    });
    renderWithRedux(
      <UserModal isVisible={isOpen} handleClose={handleClose} />,
      {}
    );
    const loader = screen.getByTestId("twitter-loading");
    await waitForElementToBeRemoved(loader);
    const userModal = screen.getByTestId("user-modal");
    expect(userModal).toBeInTheDocument();
  });
  // test("return editModal after change input=file", async () => {
  //   let isOpen = true;
  //   const handleClose = jest.fn().mockImplementation(() => {
  //     isOpen = false;
  //     return isOpen;
  //   });
  //   renderWithRedux(
  //     <UserModal isVisible={isOpen} handleClose={handleClose} />,
  //     {
  //       user: { avatar: "f", background: "g" },
  //       edit: {
  //         info: {
  //           avatar: {
  //             url: "url",
  //             file:"file"
  //           },
  //           background: {
  //             url: "url",
  //             file: "file"
  //           },
  //           website: null,
  //           birthday: null,
  //           location: null,
  //           about: null,
  //           fullname: null,
  //         },
  //         status: null,
  //       },
  //     }
  //   );
  //   const userModal = screen.queryByTestId("user-modal");
  //   const inputFile = screen.getAllByTestId("edit-input-file")[0];

  //   const file = new File(["hello.png"], "hello.png", { type: "image/png" });
  //   global.URL.createObjectURL = jest.fn(() => "details");
  //   fireEvent.change(inputFile, file);
  //   // await waitForElementToBeRemoved(userModal)
  //   const editModal = screen.queryByTestId("edit-modal");
  //   expect(editModal).toBeInTheDocument();
  // });
});
