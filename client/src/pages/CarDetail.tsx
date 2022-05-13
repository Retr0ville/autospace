/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components';
import svgs from '../svg';

const baseUrl = process.env.APP_URL || "http://127.0.0.1:8030"

const DetailWrapper = styled.div`
  min-width:400px;
  img {
    object-fit: contain;
    height: auto;
    max-width: 550px;
    border-radius:0 0 2rem 2rem;
  }
`;

const CarDetail = () => {
  const [carData, setCarData] = React.useState<any>({})
  const [reqErr, setReqErr] = React.useState("")

  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`${baseUrl}/api/car/${id}`)
      .then((response) => {
        const dt = response.data;
        setCarData(dt);
      }).catch((err) => { if (err) setReqErr("error occured while fetching car") })
  }, [id])
  return (
    <DetailWrapper className="col-9 container align-self-center mb-3">
      <div className="container d-flex flex-column align-items-center pb-4 px-0 bg-lighter">
        {reqErr && <div className="text-danger">{reqErr}</div>}
        <div className="d-flex flex-column col-9">
          <img src={carData.imageUrl} alt="car" className="w-100 align-self-center mb-3" />
          <div className="d-flex w-100 flex-column flex-lg-row">
            <div className="d-flex col-12 col-lg-6 mb-4 mb-lg-0 mt-lg-2">
              <div className="d-flex justify-content-center align-items-center w-100">
                <span className="me-2">
                  {svgs.bodyType}
                </span>
                <span>
                  {carData && carData.bodyType || "N/A"}
                </span>
              </div>
              <div className="d-flex justify-content-center align-items-center w-100">
                <span className="me-2">
                  {svgs.engine}
                </span>
                <span>
                  {carData && carData.engine || "N/A"}
                </span>
              </div>
            </div>
            <div className="d-flex col-12 col-lg-6 mt-lg-2">
              <div className="d-flex justify-content-center align-items-center w-100">
                <span className="me-2">
                  {svgs.odometer}
                </span>
                <span>
                  {carData && carData.odometer || "N/A"}
                </span>
              </div>
              <div className="d-flex justify-content-center  align-items-center w-100">
                <span className="me-2">
                  {svgs.transmission}
                </span>
                <span>
                  {carData && carData.transmission || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="rule my-3 align-self-center" />
        <div className="bg-light rounded-alt d-flex justify-content-center align-self-center py-4 col-10 col-lg-8">
          <div className="flex-column d-flex justify-content-center align-items-center col-6 px-3">
            <div className="d-flex flex-column align-self-start flex-md-row align-self-md-center mb-2 mb-md-4">
              <span className="color-gray me-3">
                Name:
              </span>
              <span className="color-gray-2">
                {carData && carData.name || "N/A"}
              </span>
            </div>
            <div className="d-flex flex-column align-self-start flex-md-row align-self-md-center mb-2 mb-md-4">
              <span className="color-gray me-3">
                Body Type:
              </span>
              <span className="color-gray-2">
                {carData && carData.bodyType || "N/A"}
              </span>
            </div>
            <div className="d-flex flex-column align-self-start flex-md-row align-self-md-center mb-2 mb-md-4">
              <span className="color-gray me-3">
                Engine:
              </span>
              <span className="color-gray-2">
                {carData && carData.engine || "N/A"}
              </span>
            </div>
            <div className="d-flex flex-column align-self-start flex-md-row align-self-md-center mb-2 mb-md-4">
              <span className="color-gray me-3">
                Odometer:
              </span>
              <span className="color-gray-2">
                {carData && `${carData.odometer} km` || "N/A"}
              </span>
            </div>
          </div>
          <div className="v-rule" />
          <div className="flex-column d-flex justify-content-center align-items-center ps-3 col-6 ">
            <div className="d-flex flex-column align-self-start flex-md-row align-self-md-center mb-2 mb-md-4">
              <span className="color-gray me-3">
                Price:
              </span>
              <span className="color-gray-2">
                {carData && `$${carData.price}` || "N/A"}
              </span>
            </div>
            <div className="d-flex flex-column align-self-start flex-md-row align-self-md-center mb-2 mb-md-4">
              <span className="color-gray me-3">
                Transmission:
              </span>
              <span className="color-gray-2">
                {carData && carData.transmission || "N/A"}
              </span>
            </div>
            <div className="d-flex flex-column align-self-start flex-md-row align-self-md-center mb-2 mb-md-4">
              <span className="color-gray me-3">
                Fuel Type:
              </span>
              <span className="color-gray-2">
                {carData && carData.fuelType || "N/A"}
              </span>
            </div>
            <div className="d-flex flex-column align-self-start flex-md-row align-self-md-center mb-2 mb-md-4">
              <span className="color-gray me-3">
                Fuel Capacity:
              </span>
              <span className="color-gray-2">
                {carData && `${carData.fuelCapacity} ltrs` || "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-light rounded-alt d-flex justify-content-end justify-content-md-center align-self-center col-10 col-lg-8">
          <button type='button' className="d-flex justify-content-center align-items-center col-6 col-lg-4 pointer mt-1 rounded p-1 border-0 bg-color-primary py-2 color-light shadow fw-bold hover-shadow mb-3">
            Contact Seller
          </button>
        </div>
      </div>
    </DetailWrapper>
  );
};

export default CarDetail;