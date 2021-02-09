export const setCursorPosition = (ctrl: any & object, pos: number) => {
  if (ctrl.setSelectionRange) {
    ctrl.focus();
    setTimeout(() => {
      ctrl.setSelectionRange(pos, pos);
    },0) // без таймаута не работает :(
  } else if (ctrl.createTextRange) {
    const range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}
