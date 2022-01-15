import React from 'react';
import styles from './Card.module.scss';

function Card({id, title, price, img, onFavorite, onPlus, favorited = false}) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus( {title, price, img} );
        setIsAdded(!isAdded);
    }

    const onClickFav = () => {
        onFavorite( { id, title, price, img} );
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFav}>
                <img src={isFavorite ? "/img/like.svg" : "/img/unlike.svg"} alt={isFavorite ? "liked" : "unliked"} />
            </div>
            <img width={133} height={112} src={img} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Added" />
            </div>
        </div>
    );
}

export default Card;