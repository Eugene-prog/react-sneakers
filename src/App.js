import "./App.scss";
import React from "react";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

import { Routes, Route } from "react-router-dom";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    axios.get("https://6384cd373fa7acb14f010a00.mockapi.io/items").then((res) => {
      setItems(res.data);
    });
    axios.get("https://6384cd373fa7acb14f010a00.mockapi.io/cart").then((res) => {
      setCartItems(res.data);
    });
    axios.get("https://6384cd373fa7acb14f010a00.mockapi.io/favorites").then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToFavorite = (obj) => {
    console.log(obj);
    axios.post("https://6384cd373fa7acb14f010a00.mockapi.io/favorites", obj);
    setFavorites((prev) => [...prev, obj]);
  };

  const onAddToCart = (obj) => {
    axios.post("https://6384cd373fa7acb14f010a00.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveFromCart = (id) => {
    console.log(id);
    axios.delete(`https://6384cd373fa7acb14f010a00.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)} onRemove={onRemoveFromCart} items={cartItems} />}

      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
