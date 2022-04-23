/* eslint linebreak-style: ["error", "windows"] */

/* eslint no-restricted-globals: "off" */

const { getDb, getNextSequence } = require('./db.js');

async function list() {
  const db = getDb();
  const products = await db.collection('products').find({}).toArray();
  console.log(products);
  return products;
}

async function get(_, { id }) {
  const db = getDb();
  const Product = await db.collection('products').findOne({ id });
  return Product;
}
async function remove(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  if (!product) return false;
  product.deleted = new Date();
  let result = await db.collection('deleted_products').insertOne(product);
  if (result.insertedId) {
    result = await db.collection('products').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

async function add(_, { product }) {
  const db = getDb();
  const newProduct = { ...product };
  console.log('Added new product to inventory');
  newProduct.id = await getNextSequence('products');
  const result = await db.collection('products').insertOne(newProduct);
  const savedProduct = await db.collection('products')
    .findOne({ _id: result.insertedId });
  return savedProduct;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.id) {
    const product = await db.collection('products').findOne({ id });
    Object.assign(product, changes);
  }
  await db.collection('products').updateOne({ id }, { $set: changes });
  const savedIssue = await db.collection('products').findOne({ id });
  return savedIssue;
}


module.exports = {
  list, add, get, remove, update,
};
