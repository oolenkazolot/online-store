import "./sass/style.scss";
import Router from "./utils/Routing";
import MainPage from "./pages/main";
import ErrorPage from "./pages/error";
import CartPage from "./pages/cart";
import { IMainPage, IErrorPage, IRout, ICartPage } from "./types/index";
import { TopHeader, BottomHeader } from "./components/header";
import { IRouter } from "./types/index";

const mainPage: IMainPage = new MainPage();
const errorPage: IErrorPage = new ErrorPage();
const cartPage: ICartPage = new CartPage();

const headerTop = new TopHeader();
headerTop.drawElements();
const headerBottom = new BottomHeader();
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
    cb: cartPage.draw,
  },
  {
    path: "products/:id",
    cb: (id) => {
      alert("welcome to products " + id);
    },
  },
];
//объект роутера
const router = new Router(routs, errorPage.draw);
mainPage.router = router;
headerBottom.router = router;
headerBottom.drawElements();

//проврка какая скйчас страница
router.init();

// a.setAttribute('href', 'cart');
// a.textContent = 'cart page';
// const b = document.createElement('a');
// b.addEventListener('click', (e) => {
//   e.preventDefault();
//   router.navigate('');
// });
// b.setAttribute('href', '');
// b.textContent = 'main page';
// const c = document.createElement('a');
// c.addEventListener('click', (e) => {
//   e.preventDefault();
//   router.navigate('products/15');
// });
// c.setAttribute('href', 'products/15');
// c.textContent = 'products page';
// document.body.append(a, b, c);
