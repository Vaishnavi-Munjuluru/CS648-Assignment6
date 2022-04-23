
/* eslint linebreak-style: ["error", "windows"] */


import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import ProductList from './ProductList.jsx';
import ProductImage from './ProductImage.jsx';
import ProductEdit from './ProductEdit.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={ProductList} />
      <Route path="/viewimage/:id" component={ProductImage} />
      <Route path="/edit/:id" component={ProductEdit} />
      <Route component={NotFound} />
    </Switch>
  );
}
