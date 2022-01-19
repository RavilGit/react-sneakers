import React from "react";
import axios from "axios";
import Card from "../components/Card/Card";

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://61e1550c63f8fc0017618b64.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при загрузке покупок');
                console.error(error);
            }
        }
        )()
    }, []);

    return (
        <div className="content p-40">
            <div className="mb-40 d-flex align-center justify-between">
                <h1>Мои покупки</h1>
            </div>

            <div className="d-flex flex-wrap">
            {(isLoading ? [...Array(4)] : orders).map((item, index) => (
                <Card
                    key={index}
                    loading={isLoading}
                    {...item}
                />
            ))}
            </div>

        </div>
    );
}

export default Orders;