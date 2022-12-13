export const dispatchMouseDownEvent = (element: Element) => {
  element.dispatchEvent(
    new MouseEvent("mousedown", {
      view: window,
      bubbles: true,
      cancelable: true,
      buttons: 1,
    })
  );
};
