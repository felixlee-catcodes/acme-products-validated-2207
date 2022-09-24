import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductUpdate = ()=> {
  const { id } = useParams();
  const { products } =  useSelector(state => state);
  const [name, setName ] = useState('');
  useEffect(()=> {
    const product = products.find( product => product.id === id);
    if(product){
      setName(product.name);
    }
  }, [products, id]);
  return (
    <form>
      <div>
        <label>Name</label>
        <input value={ name } onChange={ ev => setName(ev.target.value)}/>
      </div>
    </form>
  );
};

export default ProductUpdate;
