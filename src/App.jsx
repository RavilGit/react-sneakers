import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import AppContext from './context';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
  const [goods, setGoods] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([axios.get('https://61e1550c63f8fc0017618b64.mockapi.io/cart'), axios.get('https://61e1550c63f8fc0017618b64.mockapi.io/favorites'), axios.get('https://61e1550c63f8fc0017618b64.mockapi.io/goods')]);
  
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setGoods(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://61e1550c63f8fc0017618b64.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const {data} = await axios.post('https://61e1550c63f8fc0017618b64.mockapi.io/cart', obj);
        setCartItems(prev => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }));
      }
    } catch (error) {
      alert('Не удалось добавить в корзину');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://61e1550c63f8fc0017618b64.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://61e1550c63f8fc0017618b64.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    }
  };

  const onRemoveItem = id => {
    try {
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
      axios.delete(`https://61e1550c63f8fc0017618b64.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error)
    }
  };

  const onChangeSearchInput = event => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ goods, favorites, cartItems, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route path='/' element={<Home isLoading={isLoading} goods={goods} searchValue={searchValue} setSearchValue={setSearchValue} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} onChangeSearchInput={onChangeSearchInput} />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;