
/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import { Panel } from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';

export default class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  render() {
    const { products: { image, name } } = this.state;
    return (
      <Panel>
        <Panel.Heading>
          <h2> Image of the Product</h2>
          <h1>{name}</h1>
          <img src={image} alt={name} style={{ width: 400, height: 400 }} />
        </Panel.Heading>
      </Panel>
    );
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    const query = `query Product($id: Int!) {
      Product(id: $id) {
        id category name price image
      }
    }`;

    const response = await graphQLFetch(query, { id });
    this.setState({ products: response.Product });
  }
}
