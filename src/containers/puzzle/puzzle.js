import React, {useState, useEffect} from 'react';
import Board from './board';

const Puzzle = ({boardWidth, boardHeight}) => {
  const [createNums, setCreateNums] = useState(null);
  useEffect(() => {
    createInit()
  }, [])
  const createInit = () => {
    const numbers = [ ...Array(boardWidth*boardHeight).keys() ].map(num => num);
    numbers.sort(() => Math.random() - 0.5);
    setCreateNums(numbers)
  }
  if(!createNums) {
    return <div>Loading...</div>
  }
  return (
    <div style={{width:'100%'}}>
        <Board
        createNums={createNums}
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        />
    </div>
  );

}

export default Puzzle;