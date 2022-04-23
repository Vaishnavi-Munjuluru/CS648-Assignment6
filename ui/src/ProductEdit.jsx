
/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Col, Panel, Form, FormGroup, FormControl, ControlLabel,
  ButtonToolbar, Button,
} from 'react-bootstrap';
import Toast from './Toast.jsx';
import NumberInput from './NumberInput.jsx';
import TextInput from './TextInput.jsx';
import graphQLFetch from './graphQLFetch.js';


export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      Editproducts: {},
      invalidFields: {},
      toastVisible: false,
      toastMessage: ' ',
      toastType: 'success',
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  render() {
    const { Editproducts: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    const { toastVisible, toastMessage, toastType } = this.state;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`products with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }
    const {
      Editproducts: {
        name, category, price, image,
      },
    } = this.state;


    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title>{`Editing details of Product: ${id}`}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Product Name</Col>
              <Col sm={6}>
                <FormControl
                  componentClass={TextInput}
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Category</Col>
              <Col sm={6}>
                <FormControl
                  componentClass="select"
                  name="category"
                  value={category}
                  onChange={this.onChange}
                >
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Accessories">Accessories</option>
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Price</Col>
              <Col sm={6}>
                <FormControl
                  componentClass={NumberInput}
                  name="price"
                  value={price}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Image</Col>
              <Col sm={6}>
                <FormControl
                  componentClass={TextInput}
                  name="image"
                  value={image}
                  onChange={this.onChange}
                  key={id}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={3}>
                <ButtonToolbar>
                  <Button bsStyle="primary" type="submit">Submit</Button>
                  <LinkContainer to="/products">
                    <Button bsStyle="link">Back</Button>
                  </LinkContainer>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
        </Panel.Body>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </Panel>
    );
  }

  /* eslint-disable max-len */


  componentDidMount() {
    this.loadData();
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      Editproducts: { ...prevState.Editproducts, [name]: value },
    }));
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { Editproducts, invalidFields } = this.state;
    if (Object.keys(invalidFields).length !== 0) return;
    const query = `mutation productUpdate(
      $id: Int!
      $changes: ProductUpdateInputs!
    ) {
      productUpdate(
        id: $id
        changes: $changes
      ) {
        id category name price image
      }
    }`;
    const { id, ...changes } = Editproducts;

    const result = await graphQLFetch(query, { changes, id }, this.showError);
    if (result) {
      this.setState({ Editproducts: result.productUpdate });
      this.showSuccess('Updated Product successfully');
    }
  }

  async loadData() {
    const query = `query Product($id: Int!) {
        Product(id: $id) {
          id category name price image
        }
      }`;
    const { match: { params: { id } } } = this.props;
    const data = await graphQLFetch(query, { id });
    this.setState({ Editproducts: data ? data.Product : {} });
  }
}
