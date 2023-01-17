import React from "react";

import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import Container from "../section/Container";

import "./HomePage.scss";

export const HomePage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Container />
      </div>
      <Footer />
    </>
  );
};
