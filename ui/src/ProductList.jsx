/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-globals */


import React from 'react';
import { Panel } from 'react-bootstrap';
import ProductView from './ProductView.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.createProduct = this.createProduct.bind(this);
  }

  render() {
    return (

      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Showing all the available products</Panel.Title>
          </Panel.Heading>
        </Panel>

        <ProductView products={this.state.products} deleteProduct={this.deleteProduct} />

        <h4>Add a new product to inventory</h4>
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>

    );
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      productList{
        id name price category image
      }
    }`;
    const result = await graphQLFetch(query);
    this.setState({ products: result.productList });
  }

/* eslint linebreak-style: ["error", "windows"] */

  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { id } = products[index];
    const response = await graphQLFetch(query, { id });
    if (response && response.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        newList.splice(index, 1);
        return { products: newList };
      });
    } else {
      this.loadData();
    }
  }

  async createProduct(newProduct) {
    const query = `mutation addProduct($newProduct: ProductInputs!) {
        addProduct(product: $newProduct) {
          id
        }
      }`;
    const response = await graphQLFetch(query, { newProduct });
    if (response) { this.loadData(); }
  }

}
