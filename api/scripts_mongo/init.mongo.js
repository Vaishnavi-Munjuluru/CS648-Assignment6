
/* eslint linebreak-style: ["error", "windows"] */
/* global db print */
/* eslint no-restricted-globals: "off" */

const productDB = [
  {
    id: 1, category: 'Shirts', name: 'Allensolly Shirt', price: 10, image: 'https://mms-images.out.customink.com/mms/images/catalog/colors/176101/views/alt/front_medium_extended.png?design=kxq0-00bm-dfby',
  },
];

db.products.insertMany(productDB);
const count = db.products.count();
print('Inserted', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });

db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ category: 1 });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ image: 1 });
db.deleted_products.remove({});
db.deleted_products.createIndex({ id: 1 }, { unique: true });
