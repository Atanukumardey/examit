"use client"

import styled from "styled-components";

import { GlobalStyle } from "@/app/globalStyles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";


const ContainerUser = styled.div`
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
  /* position: relative; */
  height: 100vh;
`;

const menus = [
  {id : "1", link : "/User/home", elementID:"UserHome", menuName:"Home", isButton:false,Buttontext:""},
  {id : "2", link : "/User/profile", elementID:"UserProfile", menuName:"Profile", isButton:false,Buttontext:""},
  {id : "3", link : "/User/help", elementID:"UserHelp", menuName:"Help", isButton:false,Buttontext:""},
  {id : "4", link : "/home", elementID: null, menuName:"Logout", isButton:true,Buttontext:"Logout"}
];



export default function Examineelayout({children}) {
  return (
    // <Suspense fallback={null}>
    <>
      {<GlobalStyle/>}
      <ScrollToTop />
      <Header menus={menus}/>
      {/* <ContainerUser> */}
      {children}
      {/* </ContainerUser> */}
      <Footer />
      </>
    // </Suspense>
  )
}
