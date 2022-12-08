import Card from "../components/Card";

const Favorites = ({ items, onAddToFavorite, onAddToCart }) => (
  <div className="content p-40">
    <div className="d-flex align-center justify-between mb-40">
      <h1>Избранное</h1>
    </div>
    <div className="d-flex flex-wrap">
      {items.map((item, index) => (
        <Card
          key={index}
          id={item.id}
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          favorited={true}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
        />
      ))}
    </div>
  </div>
);

export default Favorites;
