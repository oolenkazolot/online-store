import Filter from "../components/filter";
import { IFilter } from "../types/index";

class MainPage {
  private filter: IFilter;
  constructor() {
    this.filter = new Filter();
  }

  public draw(): void {
    const mainElement: HTMLElement | null = document.querySelector("main");
    if (!mainElement) {
      return;
    }
    mainElement.textContent = "";
    const mainPageElement: HTMLElement = document.createElement("div");
    mainPageElement.classList.add("main-page");
    const filterElement: HTMLElement = this.filter.drawFilter();
    mainPageElement.append(filterElement);
    mainElement.append(mainPageElement);
  }
}

export default MainPage;
