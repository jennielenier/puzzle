import React, {useEffect, useState, useRef} from 'react';
import {BoxStyled, BoardStyled} from './boardStyled';
import PropTypes from 'prop-types';
import {Numbers} from './numbers';

const Board = ({createNums, boardWidth, boardHeight}) => {
  const styleContent = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
  const styleButton = {
    margin: '20px',
    padding: '1em 2em',
    cursor: 'pointer',
    backgroundColor: 'white',
    border: '1px solid #000'
  }
  const refBox = useRef()
  const [width, setWidth] = useState(null);
  const [create, setCreate] = useState(createNums)

  // Responsive board
  useEffect(() => {
    setWidth(refBox.current && refBox.current.offsetWidth)
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => {
        const widthEl = refBox.current && refBox.current.offsetWidth
        setWidth(widthEl)
      }, 150);
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [width]);

  const swap = (arr, posMove, emptyPos) => {
    const blockSwap = arr, x = posMove, y = emptyPos;
    blockSwap[x] = blockSwap.splice(y, 1, blockSwap[x])[0];
    setCreate(blockSwap)
  }
  const handleClick = (arr, moveIdx, emptyIdx, idx) => {
    let pos
    if(idx === moveIdx.left) {
      pos = moveIdx.left
    }else if(idx === moveIdx.right) {
      pos = moveIdx.right
    }else if(idx === moveIdx.up) {
      pos = moveIdx.up
    }else if(idx === moveIdx.down) {
      pos = moveIdx.down
    }
    if(pos != undefined) {
      swap(arr, pos, emptyIdx)
    }
  }
  const handleClickReset = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setCreate(arr)
  }
  const numbers = Numbers(create, boardWidth, boardHeight)
  const moveIdx = numbers.moveIdx
  const emptyIdx = numbers.emptyIdx
  if(!numbers.nums) {
    return <div>Loading...</div>
  }
  const boxes = numbers.nums
  const frameWidth = 100*boardWidth+'px';

  const renderBlock = () => {
    return boxes.map((box, idx) => {
      const classEmpty = box === 0 ? `empty` : ``
      const boxNumber = box != 0 ? box : null
      const widthEachBox = (100/boardWidth)+'%';
        return <BoxStyled key={idx}
          className={classEmpty}
          widthEachBox={widthEachBox}
          ref={refBox}
          height={width+'px'}
          onClick={handleClick.bind(this, boxes, moveIdx, emptyIdx, idx)}
          >
          <div className="inner">{boxNumber}</div>
        </BoxStyled>
    })
  }

  const renderResetButton = () => {
    return <button className="reset" style={styleButton}
              onClick={handleClickReset.bind(this, boxes)}>RESET
            </button>
  }

  return (
    <div style={styleContent}>
      <BoardStyled
        frameWidth={frameWidth}>
          {renderBlock()}
      </BoardStyled>
      {renderResetButton()}
    </div>
  );
}

Board.propTypes = {
  createNums: PropTypes.array.isRequired,
  boardWidth: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired,
};

export default Board;