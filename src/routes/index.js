import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={`${match.url}dashboard`} component={asyncComponent(() => import('./main/dashboard'))} />
      <Route path={`${match.url}sample`} component={asyncComponent(() => import('./main/dashboard'))} />
      <Route path={`${match.url}product-list`} component={asyncComponent(() => import('./ProductList'))} />
      <Route path={`${match.url}create-product`} component={asyncComponent(() => import('./ProductList/createProduct'))} />
      <Route path={`${match.url}orders`} component={asyncComponent(() => import('./orders'))} />
      <Route path={`${match.url}categories`} component={asyncComponent(() => import('./categories'))} />
      <Route path={`${match.url}customer`} component={asyncComponent(() => import('./customer'))} />
      <Route path={`${match.url}setting`} component={asyncComponent(() => import('./setting'))} />
      <Route path={`${match.url}demo`} component={asyncComponent(() => import('./SamplePage/Demo'))} />
    </Switch>
  </div>
);

export default App;
