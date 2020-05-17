import React, {useEffect, useState} from 'react';
import {BoxStyled, BoardStyled, ButtonWrapStyled} from './boardStyled';
import PropTypes from 'prop-types';
import {Numbers} from './numbers';
import Modal from "react-bootstrap/Modal";
import popupImage from '../../assets/congrats.gif';
import FlipMove from 'react-flip-move';

import './board.scss';

const Board = ({createNums, boardWidth, boardHeight, sortedNums}) => {
  const styleContent = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }

  const [width, setWidth] = useState(null);
  const [create, setCreate] = useState(createNums)
  const [show, setShow] = useState(false);
  const [clickSolved, setClickSolved] = useState(false);

  const handleClose = () => {
    setShow(false);
  }
  const frameWidth = 100*boardWidth+'px';
  const numbers = Numbers(create, boardWidth, boardHeight)
  const moveIdx = numbers.moveIdx
  const emptyIdx = numbers.emptyIdx

  // Responsive board
  useEffect(() => {
    const boxEl = document.getElementsByClassName('box')
    setWidth(boxEl[0] && boxEl[0].offsetWidth)
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const widthEl = boxEl[0] && boxEl[0].offsetWidth
        setWidth(widthEl)
      }, 150);
    };
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
    return (
      <FlipMove typeName={null} enterAnimation="accordionHorizontal" leaveAnimation="accordionHorizontal">{
        boxes.map((box, idx) => {
          const classEmpty = box === 0 ? `empty` : ``
          const widthEachBox = (100/boardWidth)+'%';
          const animate = clickSolved ? 'animate' : '';
            return <BoxStyled key={'box'+box}
              className={`${classEmpty} ${animate} box`}
              widthEachBox={widthEachBox}
              clickSolved={clickSolved}
              height={width+'px'}
              onClick={handleClick.bind(this, boxes, moveIdx, emptyIdx, idx)}
              >
              <div className="inner">{box}</div>
            </BoxStyled>
        })
      }</FlipMove>
    )
  }

  const renderResetButton = () => {
    return <button className="btn"
              onClick={handleClickReset.bind(this, boxes)}>NEW GAME
            </button>
  }
  const renderSolvedButton = () => {
    return <button className="btn"
              onClick={handleClickSolved.bind(this, boxes)}>SOLVED
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