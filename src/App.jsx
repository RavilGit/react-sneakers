import Card from './components/Card/Card';
import Drawer from './components/Drawer/Drawer';
import Header from './components/Header/Header';

const goods = [
  { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, img: '/img/sneakers/1.jpg' },
  { title: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, img: '/img/sneakers/4.jpg' },
  { title: 'Мужские Кроссовки Nike Air Max 270', price: 12999, img: '/img/sneakers/2.jpg' },
  { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 8499, img: '/img/sneakers/3.jpg' }
]

function App() {
  return (
    <div className="wrapper clear">

      <Drawer />
      <Header />

      <div className="content p-40">
        <div className="mb-40 d-flex align-center justify-between">
          <h1>Все кроссовки</h1>
          <div className="search_block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex">

          {goods.map(obj => (
            <Card title={obj.title} price={obj.price} img={obj.img} />
          ))}

        </div>

      </div>
    </div>
  );
}

export default App;