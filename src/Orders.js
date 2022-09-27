import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Orders = ()=> {
  const { orders } = useSelector(state => state);

  return (
    <div><ul>
        {orders.map( order => {
            return (
                <li>
                    Item: {order.product.name}
                    <br/>
                    Qty: {order.quantity} <span/>   
                    Total: {order.product.price * order.quantity}
                </li>
            )
        })}
    </ul>
    <button><Link to={'/orders/create'}>Create New Order</Link></button>
    </div>
  );
};

export default Orders;
