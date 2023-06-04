"use client"

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AttendExam from "/public/ImageAsset/EffectiveExam.svg";
import TakeExamImage from "/public/ImageAsset/TakeExam.svg";
import TrackExamImage from "/public/ImageAsset/TrackExam.svg";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle
} from "mdb-react-ui-kit";

import Image from "next/image";


function HomeOptionCard(props) {
  return (
    <MDBCard alignment='center' className="m-2 w-25">
    <MDBCardHeader>
      <Image src={props.image} width="10%" height="10%" alt="option Image"/>
    </MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>{props.optionName}</MDBCardTitle>
        <MDBBtn style={{ backgroundColor: '#7b49e6' }} href='#'>{props.buttonText}</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}

function ExamineeHome() {  
  return (
    <div className="d-flex flex-row mt-20 mb-3 align-middle justify-between flex-wrap" id="UserHome">
      <HomeOptionCard image={TakeExamImage} optionName={"Create An Exam"} buttonText={"Proceed"}/>
      <HomeOptionCard image={AttendExam} optionName={"Attend An Exam"} buttonText={"Start"}/>
      <HomeOptionCard image={TrackExamImage} optionName={"Track An Ongoing Exam"} buttonText={"View"}/>
    </div>
  )
}

export default ExamineeHome