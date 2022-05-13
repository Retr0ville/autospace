/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import SellCar from './SellCarBtn';


const HeaderWrapper = styled.div`
  h1 {
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: -0.12rem;
    margin-left: -2rem;
  }
  h6 {
    margin-left: -1rem;
  }
  .car-logo, h6 {
    z-index: 2;
  }
  --o: 0.25;
  .buy-sell, .sell-container {
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, var(--o))!important;
    transition: all .2s ease-in-out;
    :hover {
      --o: 0.15;
      transform: scale(1.005);
    }
  }
  @media only screen and (max-width: 390px){
    min-width:390px !important;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper className="w-100 bg-danger align-items-lg-center justify-content-lg-center d-flex">
      <div className="container mw-1360 d-flex justify-content-center align-items-center justify-content-sm-start align-items-lg-center justify-content-lg-center lg-row mx-0 mx-sm-2 my-2">
        <div role="button"  onClick={() => {navigate("/") }} className="buy-sell col-lg-6 pointer d-flex rounded-infinite ps-2 pe-4">
          <img src="\android-chrome-192x192.png" width={100} alt="car logo" className="car-logo my-2" />
          <div className="d-flex flex-column justify-content-between mt-2">
            <h1 className="color-light mt-0">
              Automart
            </h1>
            <h6 className="color-alt fit-content">
              Buy and sell your cars_
            </h6>
          </div>
          <SellCar classNames="mt-auto mt-lg-2 me-lg-0 ms-lg-auto align-self-lg-center d-sm-none d-lg-flex p-2 shadow rounded-infinite hover-shadow-bot sell-container" />
        </div>
        <div className="sell-container h-50 ps-2 pe-1 d-flex align-items-center justify-content-center ms-auto  rounded-infinite hover-shadow-bot d-none d-sm-flex d-lg-none">
          <SellCar classNames="py-1 pt-2" />
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;