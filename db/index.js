const Sequelize = require("sequelize");
const { UUID, UUIDV4, STRING, DECIMAL, INTEGER } = Sequelize;

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_products_db"
);

const Product = conn.define("product", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 21],
    },
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true,
      isPositive: (value) => {
        if (value <= 0) {
          throw "price must be positive";
        }
      },
    },
  },
  numberInStock: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isInt: true,
    },
  },
});

const Order = conn.define("order", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },

  quantity: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isInt: true,
    },
  },
});

Order.belongsTo(Product);

const seed = async () => {
  const [product1, product2] = await Promise.all([
    Product.create({ name: "foo", price: 2.99, numberInStock: 7 }),
    Product.create({ name: "bar", price: 2.99, numberInStock: 7 }),
  ]);

  const [order1, order2] = await Promise.all([
    Order.create({ productId: product1.id, quantity: 2 }),
    Order.create({ productId: product2.id, quantity: 2 }),
  ]);

  // return Promise.all([
  //   Product.create({ name: 'foo', price: 2.99, numberInStock: 7}),
  //   Product.create({ name: 'bar', price: 2.99, numberInStock: 7})
  // ]);
};

module.exports = {
  conn,
  seed,
  Product,
  Order,
};
