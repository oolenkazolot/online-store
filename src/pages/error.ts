class ErrorPage {
  public draw(): void {
    const mainElement: HTMLElement | null = document.querySelector('main');
    if (!mainElement) {
      return;
    }
    mainElement.textContent = '';

    //дальше в main добавить новый контент
  }
}

export default ErrorPage;
