import React from 'react';
import AppContext from "../../context";
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss';

function Card({ id, title, price, img, onFavorite, onPlus, favorited = false, loading = false }) {
    const { isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({ id, title, price, img });
    }

    const onClickFav = () => {
        onFavorite({ id, title, price, img });
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={150}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
                    <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
                    <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
                    <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
                </ContentLoader>
            ) : (
                <>
                    <div className={styles.favorite} onClick={onClickFav}>
                        <img src={isFavorite ? "/img/like.svg" : "/img/unlike.svg"} alt={isFavorite ? "liked" : "unliked"} />
                    </div>
                    <img width='100%' height={135} src={img} alt="Sneakers" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Цена:</span>
                            <b>{price} руб.</b>
                        </div>
                        <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Added" />
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;