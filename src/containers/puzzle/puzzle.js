import React, {useState, useEffect} from 'react';
import Board from './board';


const Puzzle = ({boardWidth, boardHeight}) => {
  const [sortedNums, setSortedNums] = useState(null);
  const [ranNums, setRanNums] = useState(null);
  useEffect(() => {
    createInit()
  }, [])
  const createInit = () => {
    const numbers = [ ...Array(boardWidth*boardHeight).keys() ].map(num => num);
    setSortedNums(numbers)
    numbers.sort(() => Math.random() - 0.5);
    setRanNums(numbers)
  }
  if(!ranNums) {
    return <div>Loading...</div>
  }
  return (
    <div style={{width:'100%'}}>
        <Board
        createNums={ranNums}
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        sortedNums={sortedNums}
        />
    </div>
  );

}

export default Puzzle;