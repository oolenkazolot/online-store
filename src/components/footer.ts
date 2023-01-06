class Footer {
  public drawFooter(): void {
    const footer: HTMLElement | null = document.querySelector("footer");
    if (footer) {
      footer.classList.add("footer");
      const copyright: HTMLElement = this.createCopyright();
      const linkRss: HTMLElement = this.createLinkRss();
      footer.append(copyright, linkRss);
    }
  }

  private createCopyright(): HTMLElement {
    const copyright: HTMLElement = document.createElement("div");
    copyright.classList.add("footer__copyright");
    const wrapper: HTMLElement = this.createWrapper();
    const spanTwo: HTMLElement = this.createSpan("All Rights Reserved.");
    copyright.append(wrapper, spanTwo);
    return copyright;
  }

  private createWrapper(): HTMLElement {
    const wrapper: HTMLElement = document.createElement("div");
    wrapper.classList.add("footer__wrapper");
    const elements = this.createElements();
    wrapper.append(...elements);
    return wrapper;
  }

  private createElements(): HTMLElement[] {
    const arrPath = [
      "https://github.com/oolenkazolot?tab=repositories",
      "https://github.com/alisatonks",
    ];
    const contentLinks = ["Olenkazolot", "Alisatonks"];
    const spanOne: HTMLElement = this.createSpan("© 2023");
    const linkOne = this.createLink(arrPath[0], contentLinks[0]);
    const linkTwo = this.createLink(arrPath[1], contentLinks[1]);
    return [spanOne, linkOne, linkTwo];
  }

  private createLink(path: string, content: string): HTMLElement {
    const link: HTMLElement = document.createElement("a");
    link.classList.add("footer__link");
    link.setAttribute("href", `${path}`);
    link.setAttribute("target", "_blank");
    link.textContent = content;
    return link;
  }

  private createSpan(content: string): HTMLElement {
    const span: HTMLElement = document.createElement("span");
    span.classList.add("footer__content");
    span.textContent = content;
    return span;
  }

  private createLinkRss(): HTMLElement {
    const link: HTMLElement = this.createLink("https://rs.school/js/", "");
    link.classList.add("footer__rss");
    const icon: HTMLElement = document.createElement("i");
    icon.classList.add("footer__rss-img");
    link.append(icon);
    return link;
  }
}

export default Footer;
