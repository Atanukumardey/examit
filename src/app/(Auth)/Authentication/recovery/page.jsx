"use client"
//import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    MDBBtn,
    MDBContainer,
    MDBInput
} from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function Recovery() {
    return (
        <MDBContainer fluid style={{ height: '75vh', width:"auto"}}>
        <form className='mt-20 '>
            <div className="text-center mb-3 justify-content-center">
              <h3 >Please enter your email</h3>
            </div>
            <MDBInput color='red' className='mb-4' label='Email' id='form1' type='email'/>
            <MDBBtn className="mb-4 w-100">Send Link</MDBBtn>
        </form>
        {/* Your content goes here */}
      </MDBContainer>
    );
}