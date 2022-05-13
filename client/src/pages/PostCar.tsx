/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { bodyTypes, transmissions, engines, fuelTypes } from '../data';

const FormWrapper = styled.div`
select {
  color: #5e5e5e;
  border: 1px solid #e5e5e5 !important;
}
input {
  color: #5e5e5e;
  border: 1px solid #e5e5e5 !important;
  ::placeholder { 
    font-size: 0.85rem;
    padding-left: 4px;
    opacity: .9;
  }
  
  :-ms-input-placeholder {
    font-size: 0.85rem;
    padding-left: 4px;
    opacity: .9;
  }
  
  ::-ms-input-placeholder {
    font-size: 0.85rem;
    padding-left: 4px;
    opacity: .9;
  }
}
.container {
  @media only screen and (max-width: 380px){
    min-width: 355px !important;
    margin: 0 auto !important;
  }
}
`;

const ImageThumb = ({ image }: any): JSX.Element => <img className="img-fluid col-6 rounded" src={URL.createObjectURL(image)} alt={image.name} />;
const cloudinaryApi = "https://api.cloudinary.com/v1_1/rtrvl/image/upload";
const upr = "automart-un"
const baseUrl = process.env.NODE_ENV === "production" ? "https://rtrvl-automart.herokuapp.com" : "127.0.0.1:8030"
const getUrlFromFile = async (myFile: any) => {
  try {
    const fd = new FormData();
    fd.append("file", myFile);
    fd.append("upload_preset", upr);
    const imgData = await axios.post(cloudinaryApi, fd);
    if ((!imgData.data)) throw new Error("cloud upload failed")
    const imgUrl = imgData.data.secure_url;
    return imgUrl;
  } catch (err) { return { error: err } }
}

const PostCar = () => {
  const [formData, setFormData] = React.useState<any>({
    bodyType: "Micro",
    transmission: "Manual",
    engine: "twin-cylinder",
    fuelType: "Gas",
  });
  const [formErr, setFormErr] = React.useState<any>({});
  const [file, setFile] = React.useState<any>(null);
  const [errFile, setErrFile] = React.useState("");
  const [submitErr, setSubmitErr] = React.useState("");
  const navigate = useNavigate();

  // validate
  const validate = () => {
    setFormErr({});
    if (!formData.name || formData.name.length < 3) { setFormErr({ ...formErr, name: "name is required and should be >/= 3 characters" }) }
    if (!formData.bodyType) { setFormErr({ ...formErr, bodyType: "body type is required" }) }
    if (!formData.transmission) { setFormErr({ ...formErr, transmission: "transmission is required" }) }
    if (!formData.price) { setFormErr({ ...formErr, price: "price is required" }) }
    if (!file || (errFile.length > 0)) { setFormErr({ ...formErr, imageUrl: "check if your image is valid" }) };
  }
  const isValid = () => { return Object.keys(formErr).length === 0 }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    validate();
    const valid = isValid();
    if (!valid) return;
    getUrlFromFile(file)
      .then((dbUrl) => {
        const toPost = { ...formData, imageUrl: dbUrl }
        axios.post(`${baseUrl}/api/cars`, toPost)
          .then((posted) => {
            if ((!posted.data.error)) {
              navigate("/");
            }
            else {
              setSubmitErr(posted.data.error);
            }
          }).catch(() => setSubmitErr("An error occured, item not posted! please try again"))
      })
      .catch(() => setSubmitErr("An error occured, item not posted! please try again"))
  }


  // Handles file upload event and updates state
  function handleUpload(event: any) {
    setErrFile('')
    const upFile = event.target.files[0];
    if (upFile) {
      if (upFile.size > 4397152) {
        setErrFile('file should be less than 4Mb')
        return
      } if (
        upFile.type !== 'image/jpg' && upFile.type !== 'image/jpeg' && upFile.type !== "image/png"
      ) {
        setErrFile(`invalid file type${errFile}`)
        return
      }
      setFile(upFile);
    } else {
      setFile(null);
      setErrFile('select a file')
    }

  }

  const handleChange = (e: any) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value })
  }

  return (
    <FormWrapper className="w-100 d-flex flex-column mx-5 px-3 align-self-center mb-3 justify-content-center align-items-center">
      <div className="container d-flex mt-1 mx-3 flex-column align-items-center">
        <h4 className="mt-4 d-flex flex-wrap text-break fw-bold color-gray-2 align-self-start align-self-md-center">
          Provide Your Car Details
        </h4>
        <form onSubmit={handleSubmit} className="d-flex flex-wrap  rounded-alt bg-lighter col-12 col-lg-8 p-3 pt-4 align-items-center">
          {submitErr && <p> {submitErr} </p>}
          <label htmlFor="image" id="upload-box" className="d-flex flex-column col-12 align-self-center align-items-center">
            {file && <ImageThumb image={file} />}
            <input type="file" id="image" className="rounded col-7 col-sm-6 border-light mt-3 border-1 " required accept="image/jpg, image/jpeg, image/png" onChange={handleUpload} />
            {errFile && (<small className="mb-1 mt-2 text-danger">{errFile}, please check your file </small>)}
            {file && (
              <span className="d-flex align-items-center justify-content-center  flex-column">
                <p className="mb-1 mt-2">Filename: {file.name}</p>
                <p>File size: {file.size} bytes</p>
              </span>
            )
            }

          </label>
          <label htmlFor="name" className="col-10 col-md-5 mt-4 mx-4">
            <h6 className="fw-bold w-100 color-gray-3">
              Vehicle name <span className="text-danger">*</span>
            </h6>
            <input type="text" value={formData.name ?? ''} onChange={handleChange} className="rounded border-light border-1 p-1 ps-2 w-100" placeholder="vehicle's full name..." required name="name" id="name" />
          </label>
          <label htmlFor="bodyType" className="col-10 col-md-5 mt-4 mx-4">
            <h6 className="fw-bold w-100 color-gray-3">
              Body type <span className="text-danger">*</span>
            </h6>
            <select value={formData.bodyType ?? ''} onChange={handleChange} className="rounded border-light border-1 p-1 ps-2 w-100" required name="bodyType" id="bodyType">
              {
                bodyTypes.map((type) => {
                  return <option value={type} key={type}>{type}</option>
                })
              }
            </select>
          </label>
          <label htmlFor="transmission" className="col-10 col-md-5 mt-4 mx-4">
            <h6 className="fw-bold w-100 color-gray-3">
              Transmission <span className="text-danger">*</span>
            </h6>
            <select value={formData.transmission ?? ''} onChange={handleChange} className="rounded border-light border-1 p-1 ps-2 w-100" required name="transmission" id="transmission">
              {
                transmissions.map((type: string) => {
                  return <option value={type} key={type}>{type}</option>
                })
              }
            </select>
          </label>
          <label htmlFor="engine" className="col-10 col-md-5 mt-4 mx-4">
            <h6 className="fw-bold w-100 color-gray-3">
              Engine configuration
            </h6>
            <select value={formData.engine ?? ''} onChange={handleChange} className="rounded border-light border-1 p-1 ps-2 w-100" name="engine" id="engine">
              {
                engines.map((type) => {
                  return <option value={type} key={type}>{type}</option>
                })
              }
            </select>
          </label>
          <label htmlFor="odometer" className="col-10 col-md-5 mt-4 mx-4">
            <h6 className="fw-bold w-100 color-gray-3">
              Odometer reading
            </h6>
            <input type="number" value={formData.odometer ?? ''} onChange={handleChange} className="rounded border-light border-1 p-1 ps-2 w-100" placeholder="vehicle's (Km) distance driven..." name="odometer" id="odometer" />
          </label>
          <label htmlFor="fuelType" className="col-10 col-md-5 mt-4 mx-4">
            <h6 className="fw-bold w-100 color-gray-3">
              Fuel type
            </h6>
            <select value={formData.fuelTypes ?? ''} onChange={handleChange} className="rounded border-light border-1 p-1 ps-2 w-100" name="fuelType" id="fuelType">
              {
                fuelTypes.map((type) => {
                  return <option value={type} key={type}>{type}</option>
                })
              }
            </select>
          </label>
          <label htmlFor="fuelCapacity" className="col-10 col-md-5 mt-4 mx-4">
            <h6 className="fw-bold w-100 color-gray-3">
              Fuel Capacity
            </h6>
            <input type="number" value={formData.fuelCapacity ?? ''} onChange={handleChange} max={100} className="rounded border-light border-1 p-1 ps-2 w-100" placeholder="fuel tank's full capacity..." name="fuelCapacity" id="fuelCapacity" />
          </label>
          <label htmlFor="price" className="col-10 col-md-5 mt-4 mx-4">
            <h6 className="fw-bold w-100 color-gray-3">
              Selling price <span className="text-danger">*</span>
            </h6>
            <input type="number" value={formData.price ?? ''} onChange={handleChange} className="rounded border-light border-1 p-1 ps-2 w-100" placeholder="oga how much..." required name="price" id="price" />
          </label>
          <label htmlFor="priorUse" className="col-6 d-flex flex-nowrap bg-white align-items-center justify-content-center rounded col-md-5 mt-4 py-1 mx-4">
            <h6 className="fw-bold color-gray-3 me-3">
              Prior Use?
            </h6>
            <input type="checkbox" checked={formData.priorUse || false} onChange={handleChange} className="rounded border-light border-1" placeholder="vehicle's full name..." name="priorUse" id="priorUse" />
          </label>
          <div className="d-flex flex-column align-items-end ms-4 my-3 mb-5 pe-2 w-100">
            <button type='submit' className="d-flex justify-content-center align-items-center me-5 col-6 col-lg-4 pointer mt-1 rounded p-1 border-0 bg-color-primary py-2 color-light shadow fw-bold hover-shadow mb-1">
              Save Car
            </button>
            <small className="mb-3 me-5 text-secondary">makes car available for sale</small>
          </div>
        </form>
      </div>
    </FormWrapper>
  );
};

export default PostCar;
