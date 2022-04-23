/* eslint linebreak-style: ["error", "windows"] */

/* eslint no-restricted-globals: "off" */

const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://srikanthkollimerla:newton@cluster0.6b2zx.mongodb.net/ProductList?retryWrites=true&w=majority';

function testWithCallbacks(callback) {
  console.log('\n--- testWithCallbacks ---');
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(function(err, client) {
    if (err) {
      callback(err);
      return;
    }
      console.log('Connected to MongoDB');
      const db = client.db();
      const collection = db.collection('employees');
      const employee = { id: 1, name: 'A. Callback', age: 23 };
      collection.insertOne(employee, function(err, result) {
        if (err) {
          client.close();
          callback(err);
          return;
        }
        console.log('Result of insert:\n', result.insertedId);
        collection.find({ _id: result.insertedId})
          .toArray(function(err, docs) {
          if (err) {
            client.close();
            callback(err);
            return;
          }
          console.log('Result of find:\n', docs);
          client.close();
          callback(err);
        });
      });
    });
  }
  async function testWithAsync() {
    console.log('\n--- testing_With_Async ---');
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      const db = client.db();
      const collection = db.collection('employees');
  
      const employee = { id: 2, name: 'B. Async', age: 16 };
      const result = await collection.insertOne(employee);
      console.log('Result of insert:\n', result.insertedId);
  
      const docs = await collection.find({ _id: result.insertedId })
        .toArray();
      console.log('Result of find:\n', docs);
    } catch(err) {
      console.log(err);
    } finally {
      client.close();
    }
  }
  
  testWithCallbacks(function(err) {
    if (err) {
      console.log(err);
    }
    testWithAsync();
  });