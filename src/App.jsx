import React from 'react';
import Card from './components/Card/Card';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';

function App() {
  const [goods, setGoods] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://61e1550c63f8fc0017618b64.mockapi.io/goods')
      .then(res => res.json())
      .then(json => setGoods(json));
  }, []);

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj]); 
  };

  return (
    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="mb-40 d-flex align-center justify-between">
          <h1>Все кроссовки</h1>
          <div className="search_block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">

          {goods.map(item => (
            <Card
              title={item.title}
              price={item.price}
              img={item.img}
              onFavorite={() => console.log('Favorite')}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}

        </div>

      </div>
    </div>
  );
}

export default App;