// import '@testing-library/jest-dom';
// import { LoginModal } from "./index"
// import { render, screen } from '@testing-library/react';
// import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { renderWithRedux } from '../../../../testUtils/renderWithRedux';

// describe('LoginModal test', () => {
//   const onSubmit = jest.fn()
//   describe('show modal and not show', () => {
//     it('click onClose modal in the modal', () => {
//       let isOpen = true
//       const handleClose = jest.fn().mockImplementation(() => {
//         isOpen = false
//         return isOpen
//       })
//       renderWithRedux(<LoginModal open={isOpen} onClose={handleClose} />)
//       expect(screen.getByTestId("login")).toBeInTheDocument()
//       expect(handleClose).not.toBeCalled()
//       userEvent.click(screen.getByTestId("closeModal"))
//       expect(handleClose).toBeCalled()
//       expect(isOpen).toBe(false)
//     });
//     it('show if prop show === true', () => {
//       let isOpen = true
//       const handleClose = jest.fn().mockImplementation(() => {
//         isOpen = false
//         return isOpen
//       })
//       renderWithRedux(<LoginModal open={isOpen} onClose={handleClose} />)
//       expect(screen.getByTestId("login")).toBeInTheDocument()
//     });
//     it('show if prop show === false', () => {
//       let isOpen = false
//       const handleClose = jest.fn().mockImplementation(() => {
//         isOpen = false
//         return isOpen
//       })
//       renderWithRedux(<LoginModal open={isOpen} onClose={handleClose} />)
//       expect(screen.queryByTestId("login")).not.toBeInTheDocument()
//     });
    
//   });

  
  
// })
export {}