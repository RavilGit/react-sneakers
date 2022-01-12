function Drawer() {
    return (
        <div className="overlay">
            <div className="drawer">

                <h2 className="mb-30 d-flex justify-between">Корзина<img className="remove__btn cu-p" src="/img/btn-remove.svg" alt="" /></h2>

                <div className="cart__items">
                    <div className="cart__item d-flex align-center mb-20">
                        <div style={{ backgroundImage: 'url("/img/sneakers/2.jpg")' }} className="cart_item_img"></div>
                        <div className="mr-20 flex">
                            <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                            <b>12 999 руб.</b>
                        </div>
                        <img className="remove__btn" src="/img/btn-remove.svg" alt="" />
                    </div>

                    <div className="cart__item d-flex align-center mb-20">
                        <div style={{ backgroundImage: 'url("/img/sneakers/3.jpg")' }} className="cart_item_img"></div>
                        <div className="mr-20 flex">
                            <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
                            <b>8 499 руб.</b>
                        </div>
                        <img className="remove__btn" src="/img/btn-remove.svg" alt="" />
                    </div>

                </div>

                <div className="cart_total_block">
                    <ul>
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>21 498 руб.</b>
                        </li>
                        <li>
                            <span>Налог 5%:</span>
                            <div></div>
                            <b>1074 руб.</b>
                        </li>
                    </ul>
                    <button className="green__btn">Оформить заказ<img src="/img/arrow.svg" alt="Arrow" /></button>
                </div>

            </div>
        </div>

    );
}

export default Drawer;