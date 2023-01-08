import { IRouter } from "src/types";
import Template from "../templates/template";
import textObj from "../utils/textObj";

class ModalWindow extends Template {
  public overlay: HTMLElement = document.createElement("div");
  public formWrapper: HTMLElement = document.createElement("div");
  public validityArray: boolean[] = Array(7).fill(false);
  public seconds = 5;

  createModalWindow(): void {
    this.overlay.classList.add("overlay");
    document.body.append(this.overlay);
    this.overlay.classList.add("invisible");

    this.formWrapper.className = "form-wrapper";
    document.body.append(this.formWrapper);
    this.formWrapper.classList.add("invisible");
    this.formWrapper.innerHTML = "";

    const modalCont = document.createElement("form");
    modalCont.classList.add("modal-cont");
    this.formWrapper.append(modalCont);

    const persInfoCont = this.createElement(
      "modal-cont__pers-info-cont",
      modalCont
    );
    const creditCardCont = this.createElement(
      "modal-cont__credit-card-cont",
      modalCont
    );

    this.createElement("title1", persInfoCont, textObj.title1);
    const nameCont = this.createElement("form-item", persInfoCont);
    const numberCont = this.createElement("form-item", persInfoCont);
    const addrCont = this.createElement("form-item", persInfoCont);
    const emailCont = this.createElement("form-item", persInfoCont);

    this.createElement("title2", creditCardCont, textObj.title2);
    const cardData = this.createElement("card-data", creditCardCont);

    this.createInput("name-input", nameCont, "Name");
    const nameError = this.createElement("pd-err", nameCont, textObj.nameErr);
    nameError.id = "name-error";
    nameError.classList.add("hidden");

    this.createInput("phone-input", numberCont, "Phone number");
    const phoneErr = this.createElement("pd-err", numberCont, textObj.phoneErr);
    phoneErr.classList.add("hidden");
    phoneErr.id = "phone-error";

    this.createInput("address-input", addrCont, "Delivery address");
    const addressErr = this.createElement("pd-err", addrCont, textObj.addrErr);
    addressErr.classList.add("hidden");
    addressErr.id = "address-error";

    this.createInput("email-input", emailCont, "E-mail");
    const emailErr = this.createElement("pd-err", emailCont, textObj.emailErr);
    emailErr.classList.add("hidden");
    emailErr.id = "email-error";

    const cardNumberCont = this.createElement("card-details-cont", cardData);
    const otherDataCont = this.createElement("other-cont", cardData);
    const paymentSyst = this.createElement("payment-syst", cardNumberCont);
    paymentSyst.classList.add("creditCard");
    const cardInput = this.createInput(
      "card-input",
      cardNumberCont,
      "Card number"
    );

    // cardInput.type = "number";

    const validCont = this.createElement(
      "validity-details-cont",
      otherDataCont
    );
    const CVVCont = this.createElement("validity-details-cont", otherDataCont);

    this.createElement("valid", validCont, textObj.valid);
    const validDate = this.createInput("valid-date", validCont, "Valid thru");

    this.createElement("CVV", CVVCont, textObj.CVV);
    const CVVNumb = this.createInput("CVV-numb", CVVCont, "Code");
    // CVVNumb.type = "number";

    const cardNumbErr = this.createElement("pd-err", modalCont);
    cardNumbErr.classList.add("hidden");
    cardNumbErr.innerText = textObj.cardNumbErr;
    cardNumbErr.id = "card-num-error";

    const validThruErr = this.createElement("pd-err", modalCont);
    validThruErr.innerText = textObj.validErr;
    validThruErr.classList.add("hidden");
    validThruErr.id = "card-date-error";

    const CVVError = this.createElement("pd-err", modalCont, textObj.CVVErr);
    CVVError.classList.add("hidden");
    CVVError.id = "cvv-error";

    const confirmBtn = document.createElement("div");
    confirmBtn.classList.add("modal-cont__button");
    modalCont.append(confirmBtn);
    confirmBtn.innerText = textObj.confirmBtn;
  }

  public clickConfirmButton(router?: IRouter): void {
    const confirmBtn = document.querySelector(
      ".modal-cont__button"
    ) as HTMLElement;
    this.isNameValid();
    this.isPhoneValid();
    this.isAddressValid();
    this.isEmailValid();
    this.isCardNumValid();
    this.isCardDateValid();
    this.isCVVValid();
    confirmBtn.addEventListener("click", () => {
      this.orderConfirmation(router);
    });
  }

  public isNameValid(): boolean {
    const nameInput = document.querySelector(".name-input") as HTMLInputElement;
    const nameError = document.getElementById("name-error") as HTMLElement;
    let nameValidity = false;
    nameInput.addEventListener("change", () => {
      nameValidity = /^[A-Za-z]{3,}\b.+?[A-Za-z]{3,}/g.test(nameInput.value);
      this.validityArray[0] = nameValidity;
      if (nameValidity === false) {
        nameError.classList.remove("hidden");
      } else {
        nameError.classList.add("hidden");
      }
    });
    return nameValidity;
  }

  public isPhoneValid(): boolean {
    const phoneInput = document.querySelector(
      ".phone-input"
    ) as HTMLInputElement;
    const phoneError = document.getElementById("phone-error") as HTMLElement;
    let phoneValidity = false;
    phoneInput.addEventListener("change", () => {
      phoneValidity = /^[+][\d]{8,}\d$/g.test(phoneInput.value);
      this.validityArray[1] = phoneValidity;
      if (phoneValidity === false) {
        phoneError.classList.remove("hidden");
      } else {
        phoneError.classList.add("hidden");
      }
    });
    return phoneValidity;
  }

  public isAddressValid(): boolean {
    const addressInput = document.querySelector(
      ".address-input"
    ) as HTMLInputElement;
    const addressError = document.getElementById(
      "address-error"
    ) as HTMLElement;
    let addressValidity = false;
    addressInput.addEventListener("change", () => {
      addressValidity = /^[A-Za-z]{5,}\b.+?[A-Za-z]{5,}\b.+?[A-Za-z]{5,}/u.test(
        addressInput.value
      );
      this.validityArray[2] = addressValidity;
      if (addressValidity === false) {
        addressError.classList.remove("hidden");
      } else {
        addressError.classList.add("hidden");
      }
    });
    return addressValidity;
  }

  public isEmailValid(): boolean {
    const emailInput = document.querySelector(
      ".email-input"
    ) as HTMLInputElement;
    const emailError = document.getElementById("email-error") as HTMLElement;
    let phoneValidity = false;
    emailInput.addEventListener("change", () => {
      // eslint-disable-next-line no-useless-escape
      phoneValidity = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
        emailInput.value
      );
      this.validityArray[3] = phoneValidity;
      if (phoneValidity === false) {
        emailError.classList.remove("hidden");
      } else {
        emailError.classList.add("hidden");
      }
    });
    return phoneValidity;
  }

  public isCardNumValid(): boolean {
    const cardInput = document.querySelector(".card-input") as HTMLInputElement;
    const cardError = document.getElementById("card-num-error") as HTMLElement;
    let cardValidity = false;
    const paymSyst = document.querySelector(".payment-syst") as HTMLElement;

    cardInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d]/g, "");
    });

    function changeCartIcon() {
      if (cardInput.value[0] === "3") {
        paymSyst.className = "payment-syst";
        paymSyst.classList.add("amex");
      } else if (cardInput.value[0] === "4") {
        paymSyst.className = "payment-syst";
        paymSyst.classList.add("visa");
      } else if (cardInput.value[0] === "5") {
        paymSyst.className = "payment-syst";
        paymSyst.classList.add("mastercard");
      } else if (cardInput.value[0] === "6") {
        paymSyst.className = "payment-syst";
        paymSyst.classList.add("unionPay");
      } else {
        paymSyst.className = "payment-syst";
        paymSyst.classList.add("creditCard");
      }
    }
    cardInput.addEventListener("input", () => {
      if (cardInput.value.length > 16) {
        cardInput.value = cardInput.value.slice(0, 16);
      }
      changeCartIcon();
      cardValidity = /^[\d]{16}$/g.test(cardInput.value);
      this.validityArray[4] = cardValidity;
      if (cardValidity === false) {
        cardError.classList.remove("hidden");
      } else {
        cardError.classList.add("hidden");
      }
    });
    return cardValidity;
  }

  public isCardDateValid(): boolean {
    const cardDateInput = document.querySelector(
      ".valid-date"
    ) as HTMLInputElement;
    const cardDateError = document.getElementById(
      "card-date-error"
    ) as HTMLElement;
    let cardDateValidity = false;
    cardDateInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d]/g, "");
    });

    cardDateInput.addEventListener("input", () => {
      cardDateInput.value = cardDateInput.value.replace(
        /^([\d]{2})\/?([0-9]+)/,
        "$1/$2"
      );
      if (cardDateInput.value.length > 5) {
        cardDateInput.value = cardDateInput.value.slice(0, 5);
      }
      cardDateValidity = /^(0[1-9]|1[0-2])\/\d{2}$/g.test(cardDateInput.value);
      this.validityArray[5] = cardDateValidity;
      if (cardDateValidity === false) {
        cardDateError.classList.remove("hidden");
      } else {
        cardDateError.classList.add("hidden");
      }
    });
    return cardDateValidity;
  }

  public isCVVValid(): boolean {
    const CVVInput = document.querySelector(".CVV-numb") as HTMLInputElement;
    const CVVError = document.getElementById("cvv-error") as HTMLElement;
    let CVVValidity = false;

    CVVInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d]/g, "");
    });

    CVVInput.addEventListener("input", () => {
      if (CVVInput.value.length > 3) {
        CVVInput.value = CVVInput.value.slice(0, 3);
      }
      CVVValidity = /^[1-9]{3}$/g.test(CVVInput.value);
      this.validityArray[6] = CVVValidity;
      if (CVVValidity === false) {
        CVVError.classList.remove("hidden");
      } else {
        CVVError.classList.add("hidden");
      }
    });
    return CVVValidity;
  }

  public orderConfirmation(router?: IRouter): void {
    const mainElement = document.querySelector("main") as HTMLElement;
    const overlay = document.querySelector(".overlay") as HTMLElement;
    const formWrapper = document.querySelector(".form-wrapper") as HTMLElement;
    const itemsQt = document.querySelector(
      ".header-bottom__items-amount"
    ) as HTMLElement;
    const itemsSum = document.querySelector(
      ".header-bottom__total-sum"
    ) as HTMLElement;
    const errorElements = document.querySelectorAll(".pd-err");

    const isFormValid = this.validityArray.every((el) => el === true);

    const emptyInput = () => {
      for (let i = 0; i < this.validityArray.length; i++) {
        if (this.validityArray[i] === false) {
          errorElements[i].classList.remove("hidden");
        }
      }
    };

    emptyInput();

    const timer = () => {
      if (this.seconds > 0) {
        this.seconds--;
      }
      mainElement.innerHTML = "";
      const message = this.createElement("message", mainElement);
      message.innerText = `${textObj.confirmation} ${this.seconds} seconds`;
      if (this.seconds === 0) {
        router?.navigate("");
        // location.href = 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/online-store-team/modules/purchase-modal.md';
      }
      setTimeout(timer, 1000);
    };
    if (isFormValid) {
      mainElement.innerHTML = "";
      localStorage.removeItem("itemsInCart");
      overlay.classList.add("invisible");
      formWrapper.classList.add("invisible");
      itemsQt.innerHTML = "0";
      itemsSum.innerHTML = `&#8364 0`;
      timer();
    }
  }
}

export default ModalWindow;
