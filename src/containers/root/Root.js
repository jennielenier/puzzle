import React from 'react';
import Puzzle from '../puzzle/puzzle';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Root.scss';

export default function App() {
  return (
    <React.Fragment>
      <div className="_container">
        <div className="content">
          <Puzzle boardWidth={5} boardHeight={3} />
        </div>
      </div>
    </React.Fragment>
  );
}
