import Template from "../templates/template";
import textObj from "../utils/textObj";

class ModalWindow extends Template {
  public overlay: HTMLElement = document.createElement("div");
  public formWrapper: HTMLElement = document.createElement("div");

  createModalWindow(): void {
    this.overlay.classList.add("overlay");
    document.body.append(this.overlay);
    this.overlay.classList.add("invisible");

    this.formWrapper.className = "form-wrapper";
    document.body.append(this.formWrapper);
    this.formWrapper.classList.add("invisible");

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

    const title1 = this.createElement("title1", persInfoCont, textObj.title1);
    const nameCont = this.createElement("form-item", persInfoCont);
    const numberCont = this.createElement("form-item", persInfoCont);
    const addrCont = this.createElement("form-item", persInfoCont);
    const emailCont = this.createElement("form-item", persInfoCont);

    const title2 = this.createElement("title2", creditCardCont, textObj.title2);
    const cardData = this.createElement("card-data", creditCardCont);

    const nameInput = this.createInput("name-input", nameCont, "Name");
    const nameError = this.createElement("pd-err", nameCont, textObj.nameErr);
    nameError.classList.add("hidden");

    const phoneInput = this.createInput(
      "phone-input",
      numberCont,
      "Phone number"
    );
    const phoneErr = this.createElement("pd-err", numberCont, textObj.phoneErr);
    phoneErr.classList.add("hidden");

    const addressInput = this.createInput(
      "address-input",
      addrCont,
      "Delivery address"
    );
    const addressErr = this.createElement("pd-err", addrCont, textObj.addrErr);
    addressErr.classList.add("hidden");

    const emailInput = this.createInput("email-input", emailCont, "E-mail");
    const emailErr = this.createElement("pd-err", emailCont, textObj.emailErr);
    emailErr.classList.add("hidden");

    const cardNumberCont = this.createElement("card-details-cont", cardData);
    const otherDataCont = this.createElement("other-cont", cardData);
    const paymentSyst = this.createElement("payment-syst", cardNumberCont);
    const cardInput = this.createInput(
      "card-input",
      cardNumberCont,
      "Card number"
    );

    const validCont = this.createElement(
      "validity-details-cont",
      otherDataCont
    );
    const CVVCont = this.createElement("validity-details-cont", otherDataCont);

    const valid = this.createElement("valid", validCont, textObj.valid);
    const validDate = this.createInput("valid-date", validCont, "Valid thru");

    const CVV = this.createElement("CVV", CVVCont, textObj.CVV);
    const CVVNumb = this.createInput("CVV-numb", CVVCont, "Code");

    const cardNumbErr = this.createElement("card-err", modalCont);
    cardNumbErr.classList.add("hidden");
    cardNumbErr.innerText = textObj.cardNumbErr;

    const validThruErr = this.createElement("card-err", modalCont);
    validThruErr.innerText = textObj.validErr;
    validThruErr.classList.add("hidden");

    const CVVError = this.createElement("card-err", modalCont, textObj.CVVErr);
    CVVError.classList.add("hidden");

    const confirmBtn = document.createElement("button");
    confirmBtn.classList.add("modal-cont__button");
    modalCont.append(confirmBtn);
    confirmBtn.innerText = textObj.confirmBtn;
  }
}

export default ModalWindow;
