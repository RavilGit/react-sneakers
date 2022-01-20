import React from 'react';
import Info from '../Info/Info';
import { useCart } from '../../hooks/useCart';
import axios from 'axios';

import styles from './Drawer.module.scss';

const delay = ms => new Promise(res => setTimeout(res, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://61e1550c63f8fc0017618b64.mockapi.io/orders', {
                items: cartItems
            });

            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://61e1550c63f8fc0017618b64.mockapi.io/cart/' + item.id);
                await delay(1000);
            }

        } catch (error) {
            alert('Ошибка при создании заказа');
        }
        setIsLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>

                <h2 className="mb-30 d-flex justify-between">Корзина<img className="remove__btn cu-p" onClick={onClose} src="img/btn-remove.svg" alt="Close" /></h2>

                {items.length > 0 ? (
                    <div className='d-flex flex-column flex'>
                        <div className={styles.cart__items}>
                            {items.map(item => (
                                <div key={item.id} className="cart__item d-flex align-center mb-20">
                                    <div style={{ backgroundImage: `url(${item.img})` }} className="cart_item_img"></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{item.title}</p>
                                        <b>{item.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(item.id)} className="remove__btn" src="img/btn-remove.svg" alt="Remove" />
                                </div>
                            ))}
                        </div>
                        <div className={styles.cart_total_block}>
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className={styles.green__btn}>Оформить заказ<img src="img/arrow.svg" alt="Arrow" /></button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
                        description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                        image={isOrderComplete ? "img/order_complete.jpg" : "img/cartEmpty.png"}
                    />
                )}



            </div>
        </div>
    );
}

export default Drawer;