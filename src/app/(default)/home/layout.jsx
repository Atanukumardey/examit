"use client"

import styled from "styled-components";

import { GlobalStyle } from "@/app/globalStyles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Suspense } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

const menus = [
  {id : "1", link : "#home", elementID:"home", menuName:"Home", isButton:false,Buttontext:""},
  {id : "2", link : "#about", elementID:"about", menuName:"About", isButton:false,Buttontext:""},
  {id : "3", link : "#services", elementID:"services", menuName:"Services", isButton:false,Buttontext:""},
  {id : "4", link : "#contact", elementID:"contact", menuName:"Contact", isButton:true,Buttontext:"Contact Us"}
];



export default function Examineelayout({children}) {
  return (
    <Suspense fallback={null}>
      {<GlobalStyle/>}
      <ScrollToTop />
      <Header menus={menus}/>
      {/* <Container> */}
      {children}
      {/* </Container> */}
      <Footer />
    </Suspense>
  )
}
