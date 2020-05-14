import styled from 'styled-components';
import { device } from '../../styles/device';


export const BoardStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: ${props => props.frameWidth ? props.frameWidth : '800px'};
  width: 100%;
`;

export const BoxStyled = styled.div`
  flex: 1 ${props => props.widthEachBox ? props.widthEachBox : '25%'};
  background-color: ${props => props.clickSolved ? '#6610f2' : '#5a2980'};
  height: ${props => props.height ? props.height : '100px'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 2s ease-in-out;


  &:hover {
    background-color: ${props => props.clickSolved ? '#6610f2' : '#a02ebd'};
  }

  &.empty {
    opacity: 0;
  }
   .inner {
       display: flex;
       justify-content: center;
       align-items: center;
       font-size: 26px;
       color: #fff;

       @media ${device.mobile} {
          font-size: 100%;
        }
   }

   &.animate {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
    transform: translate3d(0, 0, 0);
   }
   @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
`;

export const ButtonWrapStyled = styled.div`
  display: flex;
`;

