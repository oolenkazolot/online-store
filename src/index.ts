import "./sass/style.scss";
import Router from "./utils/Routing";
import MainPage from "./pages/main";
import ErrorPage from "./pages/error";
import { IMainPage, IErrorPage, IRout } from "./types/index";

const mainPage: IMainPage = new MainPage();
const errorPage: IErrorPage = new ErrorPage();

//router start
//список страниц с колбеками: путь и что делать
const routs: IRout[] = [
  {
    path: "",
    cb: mainPage.draw.bind(mainPage),
  },
  {
    path: "cart",
    cb: () => {
      //передать метод для отрисовки корзины
      alert("welcome to cart");
    },
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
//проврка какая скйчас страница
router.init();

// Для примера создания ссылки роутера
//первый для кнопки(ссылки) на корзину
// const a = document.createElement('a');
// a.addEventListener('click', (e) => {
//   e.preventDefault();
//   router.navigate('cart');
// });
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
import { TopHeader, BottomHeader } from "./components/header";

const headerTop = new TopHeader();
headerTop.drawElements();
const headerBottom = new BottomHeader();
headerBottom.drawElements();
