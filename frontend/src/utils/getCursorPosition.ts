export const getCursorPosition = (element: any) => {
  element.focus();

  if (element.selectionStart) {
    return element.selectionStart;
  }
  return 0;
}