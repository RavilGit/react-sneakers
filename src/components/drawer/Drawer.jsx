import styles from './Drawer.module.scss';

function Drawer({ onClose, onRemove, items = [] }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>

                <h2 className="mb-30 d-flex justify-between">Корзина<img className="remove__btn cu-p" onClick={onClose} src="/img/btn-remove.svg" alt="Close" /></h2>

                {items.length > 0 ? (
                    <div>
                        <div className={styles.cart__items}>
                            {items.map(item => (
                                <div key={item.id} className="cart__item d-flex align-center mb-20">
                                    <div style={{ backgroundImage: `url(${item.img})` }} className="cart_item_img"></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{item.title}</p>
                                        <b>{item.price} руб.</b>
                                    </div>
                                    <img onClick={() => onRemove(item.id)} className="remove__btn" src="/img/btn-remove.svg" alt="Remove" />
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
                ) : (
                    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className='mb-20' width={120} height={120} src="/img/cartEmpty.png" alt="Empty Cart" />
                        <h2>Корзина пустая</h2>
                        <p className='opacity-6'>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                        <button onClick={onClose} className='green__btn'>
                            <img src="/img/arrow.svg" alt="Arrow" />
                            Вернуться назад
                        </button>
                    </div>
                )}



            </div>
        </div>

    );
}

export default Drawer;