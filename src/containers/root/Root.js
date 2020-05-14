import React from 'react';
import Puzzle from '../puzzle/puzzle';
import 'bootstrap/dist/css/bootstrap.min.css';


import './Root.scss';

export default function App() {
  return (
    <React.Fragment>
      <div className="_container">
        <div className="content">
          <Puzzle boardWidth={4} boardHeight={4} />
        </div>
      </div>
    </React.Fragment>
  );
}
