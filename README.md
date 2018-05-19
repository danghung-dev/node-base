# Node Base

## Sequelize cli

```
# Don't use sequelize init, just create folder models, migrations
# Create model
 node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
# Create migration
node_modules/.bin/sequelize migration:generate --name add-username
```

#### 1. Migration file for many-to-many association

Need to create one more table
Ex: many orders has many products
You need:

* 2 model files
* 3 migration files

First, create a migration file

```
node_modules/.bin/sequelize migration:generate --name product_order
```

```
migrations/project_order.js

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('product_orders',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products',
            key: 'id'
          },
          allowNull: false
        },
        orderId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'orders',
            key: 'id'
          },
          allowNull: false
        }
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
  )},
down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('product_orders')
  }
};
```

Model file

```
models/order.js
order.associate = function (models) {
  order.belongsToMany(models.product, { through: 'product_order', as: 'product' });
};
models/product.js
product.associate = function (models) {
  product.belongsToMany(models.order, { through: 'product_order', as: 'order' });
};
```

the as: ‘aliasName' is will create an alias that you can pass to include when querying for your orders/product. You will also have a product_order.js model file so it gets added to the Sequelize instance in models/index.js. Here is an example of how you can use this association with orders:

```
var db = '../models'
var Order = db.order;
var Product = db.product;
app.route('/order/:id')
  .get(function(req, res) {
    return Order.findOne({ where: { id: req.params.id }, include: ['product'] })
      .then(handleResponse(res), handleError(res));
  })
  .put(function(req, res) {
      return Order.findOne({ where: { id: req.params.id } })
        .then(function(order) {
          return order.addProduct(req.body.productId);
        })
        .then(handleResponse(res), handleError(res));
  });
```
