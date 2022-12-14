import "./sass/style.scss";
import Router from "./utils/Routing";

//router start
const router = new Router({
  mode: "history",
  root: "/",
});

router
  .add(/cart/, (): void => {
    alert("welcome in cart");
  })
  .add(/products\/(.*)/, (id?: string): void => {
    alert(`products: ${id}`);
  })
  .add("", (): void => {
    // general controller
    console.log("welcome in catch all controller");
  });
//router end

// Для примера создания ссылки роутера
// const a = document.createElement('a');
// a.addEventListener('click', (e) => {
//   e.preventDefault();
//   router.navigate('/cart');
// });
// a.setAttribute('href', '/about');
// a.textContent = 'cart page';
// document.body.append(a);
