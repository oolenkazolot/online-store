abstract class Template {
  protected createElement(
    myClass: string,
    parentElement?: HTMLElement,
    text?: string
  ): HTMLElement {
    const newElem = document.createElement("div");
    newElem.classList.add(myClass);
    if (parentElement) {
      parentElement.append(newElem);
    }
    if (text) {
      newElem.innerText = text;
    }
    return newElem;
  }

  protected createInput(
    myClass: string,
    parentElement: HTMLElement,
    placeholder: string
  ): HTMLInputElement {
    const inputEl = document.createElement("input");
    inputEl.classList.add(myClass);
    inputEl.placeholder = placeholder;
    parentElement.append(inputEl);
    return inputEl;
  }
}

export default Template;
