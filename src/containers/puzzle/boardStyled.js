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
  background-color: #5a2980;
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
    background-color: #a02ebd;
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
`;