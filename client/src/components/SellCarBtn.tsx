/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const SellCarWrapper = styled.div`
  .add-car {
    z-index: 2;
  }
  .add-car-icon {
    margin-left: -.73rem;
    z-index: 1;
  }
  & > *{
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    .add-car {
      transform: translateX(-0.8rem);
    }
    .add-car-icon {
      transform: scale(1.2) translateX(-0.5rem);
      z-index: 3 !important;
    }
  }
`;

// eslint-disable-next-line react/require-default-props
const SellCarBtn = ({ classNames } : {classNames? : string}) => {
  const navigate = useNavigate();
  return (
    <SellCarWrapper onClick={(e:any) => {  e.stopPropagation(); navigate("/sell") }} className={`sell d-flex align-items-center me-2 mb-1 ${classNames || ''}`}>
      <img src="\images\car-plus-cropped.png" width={65} alt="add-car" className="add-car" />
      <FaPlus className= "add-car-icon color-light mb-auto" />
    </SellCarWrapper>
  );
}


export default SellCarBtn;