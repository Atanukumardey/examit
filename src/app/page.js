"use client"
import { GlobalStyle } from "./globalStyles";
import './globals.css';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Suspense } from "react";
import Home from "./(client)/Home/page";

// const Home = lazy(() => import("./(client)Pages/Home"));
// const Header = lazy(() => import(""));
// const Footer = lazy(() => import("./components/Footer/index"));
// const ScrollToTop = lazy(() => import("./components/ScrollToTop/index"));



export default function App() {
  return (
    <Suspense fallback={null}>
      <GlobalStyle />
      {/* Hi There! */}
      <ScrollToTop />
      <Header />
      <Home />
      <Footer />

    </Suspense>
  );
}
