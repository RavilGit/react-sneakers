import React from "react";
import Card from "../components/Card/Card";

function Home({ isLoading, goods, searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddToFavorite }) {
    
    const renderItems = () => {
        const filteredItems = goods.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ));
    }

    return (
        <div className="content p-40">
            <div className="mb-40 d-flex align-center justify-between">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search_block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    {searchValue && <img onClick={() => setSearchValue("")} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear" />}
                    <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
                </div>
            </div>

            <div className="d-flex flex-wrap">{renderItems()}</div>

        </div>
    );
}

export default Home;