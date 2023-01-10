class ErrorPage {
  public draw(): void {
    const mainElement: HTMLElement | null = document.querySelector("main");
    if (!mainElement) {
      return;
    }
    mainElement.textContent = "";
    const wrapper = document.createElement("div");
    mainElement.append(wrapper);
    wrapper.className = "error-wrapper";
  }
}

export default ErrorPage;
