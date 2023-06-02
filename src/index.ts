import "./sass/style.scss";
import Router from "./utils/Routing";
import MainPage from "./pages/main";
import ErrorPage from "./pages/error";
import CartPage from "./pages/cart";

import {
  IMainPage,
  IErrorPage,
  IRout,
  ICartPage,
  IProductPage,
} from "./types/index";
import { TopHeader, BottomHeader } from "./components/header";
import ProductPage from "./pages/product";
import Footer from "./components/footer";

const mainPage: IMainPage = new MainPage();
const errorPage: IErrorPage = new ErrorPage();
const cartPage: ICartPage = new CartPage();
const productPage: IProductPage = new ProductPage();

const headerTop = new TopHeader();
headerTop.drawElements();

const headerBottom = new BottomHeader();

const footer = new Footer();
footer.drawFooter();
// headerBottom.drawElements();

//router start
//список страниц с колбеками: путь и что делать
const routs: IRout[] = [
  {
    path: "",
    cb: mainPage.draw.bind(mainPage),
  },
  {
    path: "cart",
    cb: cartPage.draw.bind(cartPage),
  },
  {
    path: "products/:id",
    cb: (id) => {
      productPage.draw(id);
    },
  },
];
//объект роутера
const router = new Router(routs, errorPage.draw);

//проврка какая скйчас страница
mainPage.router = router;
productPage.router = router;
cartPage.router = router;
headerBottom.router = router;
headerBottom.drawElements();
router.init();
