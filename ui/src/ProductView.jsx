/* eslint-disable react/jsx-no-target-blank */


/* eslint linebreak-style: ["error", "windows"] */


import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import {
  Button, Table,
} from 'react-bootstrap';


export default function ProductView({ products, deleteProduct }) {
  const productRows = products.map((product, index) => (

    <ProductRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      index={index}
    />
  ));

  return (

    <Table bordered condensed hover responsive>
      <thead>

        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </Table>
  );
}


const ProductRow = withRouter(({
  product, index, deleteProduct,

}) => (
  <tr>

    <td>{product.name}</td>
    <td>{product.category}</td>
    <td>{product.price}</td>
    <td><a href={`/viewimage/${product.id}`} target="_blank"> View</a></td>
    <td>
      <LinkContainer to={`/edit/${product.id}`}>
        <Button bsStyle="info">Edit</Button>
      </LinkContainer>
    </td>
    <td>
          <Button bsStyle="danger" onClick={() => deleteProduct(index)}>
            {" "}
            Delete{" "}
          </Button>
    </td>
  </tr>
));
