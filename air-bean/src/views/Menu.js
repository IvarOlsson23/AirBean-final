import Header from "../components/Header";
import MenuFetch from "../components/MenuFetch";
import Cart from "../components/Cart";
import Footer from "../components/Footer";

function Menu() {
  return (
    <main className="">
      <Header></Header>
      <Cart></Cart>
      <MenuFetch></MenuFetch>
      <Footer></Footer>
    </main>
  );
}

export default Menu;
