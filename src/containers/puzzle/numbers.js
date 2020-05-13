import React, {useState, useEffect} from 'react';


export const Numbers = (arr, boardWidth, boardHeight) => {
    const [nums, setNums] = useState(null)
    const [emptyIdx, setEmptyIdx] = useState(null)
    const [moveIdx, setMoveIdx] = useState({})

    useEffect(() => {
        getNums(arr)
        return () => {
        }
    }, [arr]);

    const getNums = (arr) => {
        let h = 0
        let x = []
        let board = []
        let emptyPos
        let left, right, up, down
        for(let i = 0; i < boardHeight; i++) {
            x[i] = arr.slice(h, h += boardWidth)
        }
        for(let i = 0; i < x.length; i++) {
            board.push(...x[i])
        }
        for(let i = 0; i < board.length; i++) {
            if(board[i] === 0) emptyPos = i
            if(board[i] === getClickAbleNumber(x).left) left = i
            if(board[i] === getClickAbleNumber(x).right) right = i
            if(board[i] === getClickAbleNumber(x).up) up = i
            if(board[i] === getClickAbleNumber(x).down) down = i
        }

        setMoveIdx({left: left, right: right, up: up, down: down})
        setEmptyIdx(emptyPos)
        setNums(board)
    }
    const getClickAblePos = (x) => {
        let left = {}
        let right = {}
        let up = {}
        let down = {}

        for(let i = 0; i < x.length; i++) {
            x[i].find((el, idx) => {
                if(el === 0) {
                    left[i] = idx > 0 ? idx-1 : null
                    right[i] = idx < x[i].length ? idx+1 : null
                    up[i-1] = x[i-1] != undefined ? idx : null
                    down[i+1] = x[i+1] != undefined ? idx : null
                }
            })
        }
        return {left: left, right: right, up: up, down: down}
    }
    const getClickAbleNumber = (x) => {
        const {left, right, up, down} = getClickAblePos(x)
        let leftNum, rightNum, upNum, downNum

        for(let i = 0; i < x.length; i++) {
            for(let a in left) {
                if(i == a) leftNum = left[a] != null ? x[i][left[a]] : null
            }
            for(let a in right) {
                if(i == a) rightNum = right[a] != null ? x[i][right[a]] : null
            }
            for(let a in up) {
                if(i == a) upNum = up[a] != null ? x[i][up[a]] : null
            }
            for(let a in down) {
                if(i == a) downNum = down[a] != null ? x[i][down[a]] : null
            }
        }
        return {left: leftNum, right: rightNum, up: upNum, down: downNum}
    }
    return (
        {nums: nums, moveIdx: moveIdx, emptyIdx: emptyIdx}
    );
}