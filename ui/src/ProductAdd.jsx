// /* eslint-disable react/destructuring-assignment */
/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */
/* eslint linebreak-style: ["error", "windows"] */


import React from 'react';
import {
  Button, FormGroup, FormControl, ControlLabel, Row, Col, ButtonToolbar, Form,
} from 'react-bootstrap';

export default class ProductAdd extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { Price: '$' };
    this.handlepriceChange = this.handlepriceChange.bind(this);
  }

  render() {
    const { Price } = this.state;
    return (


      <Form inline name="productAdd" onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>

              <ControlLabel htmlFor="productname">Product Name</ControlLabel>
              {' '}
              <FormControl type="text" name="Product_Name" placeholder="Product Name" id="productname" />
            </FormGroup>
            {' '}
          </Col>

          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel htmlFor="Price">Price Per Unit</ControlLabel>
              {' '}
              <FormControl type="text" name="Price" placeholder="Price" id="Price" defaultValue={Price} onChange={this.handlepriceChange} />
            </FormGroup>
            {' '}
          </Col>
        </Row>
        <Row>
          <Col xs={6} sm={4} md={3} lg={2}>

            <FormGroup>
              <ControlLabel htmlFor="category">Category</ControlLabel>
              <FormControl componentClass="select" name="category" id="category">
                <option value="">Select your Category</option>
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jackets</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Accessories">Accessories</option>
              </FormControl>
            </FormGroup>
          </Col>

          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel htmlFor="ImageURL">Image URL</ControlLabel>

              <FormControl type="text" name="Image_URL" placeholder="URL" id="ImageURL" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <br />
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit">Add Product</Button>
              </ButtonToolbar>
            </FormGroup>
          </Col>

        </Row>


      </Form>

    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const Price = form.Price.value.replace('$', '');
    const product = {
      name: form.Product_Name.value,
      price: Price > 0 ? Price : null,
      image: form.Image_URL.value,
      category: form.category.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.Product_Name.value = '';
    form.Price.value = '$';
    form.Image_URL.value = '';
    form.category.value = '';
  }

  handlepriceChange() {
    this.setState({ Price: document.forms.productAdd.Price.value });
  }


}
