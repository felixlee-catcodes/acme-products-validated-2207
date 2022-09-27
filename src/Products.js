import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct } from './store';

const Products = ()=> {
  const { products } = useSelector(state => state);

  const remove = ()=>{
    console.log('clicked')
  }

  return (
    <div><ul>
      {
        products.map( product => {
          return (
            <li key={ product.id }>
              { product.name }
              (${ product.price })
              <br />
              Number In Stock { product.numberInStock }
              <br />
              <Link to={`/products/${product.id}`}>Edit</Link> / <button onClick={ deleteProduct }>Delete</button>
            </li>
          );
        })
      }
    </ul>
    <button><Link to={'/products/create'}>Add NewProduct</Link></button>
    </div>
  );
};

export default Products;
