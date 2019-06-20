import React, { Component, Fragment } from 'react';
import { getCategoryList } from './state/category';

export default class Category extends Component {
  state = { category: {} };
  componentDidMount() {
    const loadedData = getCategoryList();

    this.setState({ category: loadedData });
  }

  renderCategory() {
    const { category } = this.state;

    if(category.products) {
      return category.products.map((product) => {
        return <div>Test</div>
      })
    }
  }

  render() {
    return (
      <Fragment>
        {this.renderCategory()}
      </Fragment>
    );
  }
}
