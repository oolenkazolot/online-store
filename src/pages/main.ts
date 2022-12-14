class MainPage {
  public draw(): void {
    const mainElement: HTMLElement | null = document.querySelector("main");
    if (!mainElement) {
      return;
    }
    mainElement.textContent = "";
    const title: HTMLElement = document.createElement("h1");
    title.textContent = "Привет";
    mainElement?.append(title);
  }
}

export default MainPage;
