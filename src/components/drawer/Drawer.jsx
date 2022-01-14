import styles from './Drawer.module.scss';

function Drawer({ onClose, items = [] }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>

                <h2 className="mb-30 d-flex justify-between">Корзина<img className="remove__btn cu-p" onClick={onClose} src="/img/btn-remove.svg" alt="" /></h2>

                <div className="cart__items">
                    {items.map(item => (
                        <div className="cart__item d-flex align-center mb-20">
                            <div style={{ backgroundImage: `url(${item.img})` }} className="cart_item_img"></div>
                            <div className="mr-20 flex">
                                <p className="mb-5">{item.title}</p>
                                <b>{item.price} руб.</b>
                            </div>
                            <img className="remove__btn" src="/img/btn-remove.svg" alt="" />
                        </div>
                    ))}
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