import React from 'react';
import Category from '../category/Category';
import './Root.scss';

export default function App() {
  return (
    <div>
      <header className="header">
        <strong className="header__app">App</strong>
      </header>
      <div className="_container">
        <div className="content">
          <Category />
        </div>
      </div>
    </div>
  );
}
