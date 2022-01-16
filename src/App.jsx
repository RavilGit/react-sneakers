import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [goods, setGoods] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://61e1550c63f8fc0017618b64.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://61e1550c63f8fc0017618b64.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://61e1550c63f8fc0017618b64.mockapi.io/goods');

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data); 
      setGoods(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://61e1550c63f8fc0017618b64.mockapi.io/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('https://61e1550c63f8fc0017618b64.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);
      }
    } catch (error) {
      alert('Не удалось добавить в корзину');
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://61e1550c63f8fc0017618b64.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post('https://61e1550c63f8fc0017618b64.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onRemoveItem = id => {
    axios.delete(`https://61e1550c63f8fc0017618b64.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const onChangeSearchInput = event => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route path='/' element={<Home isLoading={isLoading} goods={goods} cartItems={cartItems} searchValue={searchValue} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} onChangeSearchInput={onChangeSearchInput} />} />
        <Route path='/favorites' element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />} />
      </Routes>
    </div>
  );
}

export default App;