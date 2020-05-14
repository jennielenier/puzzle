import React, {useEffect, useState, useRef} from 'react';
import {BoxStyled, BoardStyled, ButtonWrapStyled} from './boardStyled';
import PropTypes from 'prop-types';
import {Numbers} from './numbers';
import Modal from "react-bootstrap/Modal";
import popupImage from '../../assets/congrats.gif';

import './board.scss';


const arrSolved = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
const Board = ({createNums, boardWidth, boardHeight, sortedNums}) => {
  const styleContent = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
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
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);
  const [clickSolved, setClickSolved] = useState(false);

  const handleClose = () => {
    setShow(false);
    setHide(true)
  }

  const frameWidth = 100*boardWidth+'px';
  const numbers = Numbers(create, boardWidth, boardHeight)
  const moveIdx = numbers.moveIdx
  const emptyIdx = numbers.emptyIdx

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

  useEffect(() => {
    if(numbers.nums) {
      const boxes = numbers.nums
      equalTwoArr(boxes, solvedNums(sortedNums))
      // const isSolved = equalTwoArr(boxes, solvedNums(sortedNums))
      // if(isSolved && !hide) {
      //   setTimeout(() => {
      //     setShow(true)
      //   }, 2000)
      // }
    }
  }, [numbers, show]);

  const equalTwoArr = (array1, array2) => {
    return array1.length === array2.length &&
    array1.every((value, index) => {
        return value === array2[index]
      })
  }
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
    console.log('clickSolved', clickSolved)
    if(pos != undefined && !clickSolved) {
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
  const handleClickSolved = (arr) => {
    setCreate(solvedNums(arr))
    setClickSolved(true)
    setTimeout(() => {
      setClickSolved(false)
      setShow(true)
    }, 3000)

  }
  const solvedNums = (numbersArr) => {
    const sorted = numbersArr.sort((a,b) => a - b);
    sorted.push(sorted.splice(sorted.indexOf(0), 1)[0])
    return sorted
  }

  if(!numbers.nums) {
    return <div>Loading...</div>
  }
  const boxes = numbers.nums

  const renderBlock = () => {
    return boxes.map((box, idx) => {
      const classEmpty = box === 0 ? `empty` : ``
      const boxNumber = box != 0 ? box : null
      const widthEachBox = (100/boardWidth)+'%';
      const animate = clickSolved ? 'animate' : '';
        return <BoxStyled key={idx}
          className={`${classEmpty} ${animate}`}
          widthEachBox={widthEachBox}
          clickSolved={clickSolved}
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
              onClick={handleClickReset.bind(this, boxes)}>SLUMPA
            </button>
  }
  const renderSolvedButton = () => {
    return <button className="reset" style={styleButton}
              onClick={handleClickSolved.bind(this, boxes)}>ORDNAD
            </button>
  }

  return (
    <div style={styleContent}>
      <BoardStyled
        frameWidth={frameWidth}>
          {renderBlock()}
      </BoardStyled>
      <ButtonWrapStyled className="buttonWrapper">
        {renderResetButton()}
        {renderSolvedButton()}
      </ButtonWrapStyled>

      <Modal show={show} onHide={handleClose} centered className="victoryModalDialog" size="lg">
      <Modal.Header closeButton>
        </Modal.Header>
      <Modal.Body className="victoryModalBody">
        <div className="imageWrap">
          <img
          src={popupImage} />
        </div>
      </Modal.Body>
      </Modal>



    </div>
  );
}

Board.propTypes = {
  createNums: PropTypes.array.isRequired,
  boardWidth: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired
};

export default Board;