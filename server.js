const express = require('express');
const { conn, seed, Product, Order } = require('./db');
const app = express();
const path = require('path');
app.use(express.json());


app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/products', (req, res, next)=> {
  /*
  try {
    const products = await Product.findAll();
    res.send(products);
  }
  catch(ex){
    next(ex);
  }
  */
  Product.findAll()
    .then( products => res.send(products))
    .catch(next);
});

app.get('/api/orders', (req, res, next)=>{
  Order.findAll({
    include: [{ model: Product }]
  })
    .then(orders => res.send(orders))
    .catch(next);
})

app.put('/api/products/:id', (req, res, next)=> {
  Product.findByPk(req.params.id)
    .then( product => product.update(req.body))
    .then( product => res.send(product))
    .catch(next);
});

app.post('/api/products/create', async(req, res, next)=>{
  try{
    await Product.create(req.body)
    res.send(req.body)
    console.log(req.body)
  }
  catch(ex){
    next(ex)
  }
})

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(err);
});


const start = async()=> {
  try {
    await conn.sync({ force: true });
    await seed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

start();

