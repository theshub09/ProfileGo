import React from "react";
import Button from "../components/Button";
import Vector5 from "../assets/Vector/Vector5.png";
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section id="home">
      <div className="container-fluid px-0">
        <div className="container">
          <div className="row mt-lg-4">
            <div className="col-lg-8 col-md-12">
              <h1 className="primary-text" style={{ marginTop: "1rem" }}>
              "Navigate Profiles, Explore Locations: Discover the World with One Click."

              </h1>
              <h3
                className="para-1 d-flex justify-content-center align-items-center"
                style={{ marginTop: "1rem", lineHeight: "1.3rem" }}
              >
ConnectGO is an innovative web application designed to let users effortlessly explore profiles and their associated locations on an interactive map. Whether you're looking to connect with individuals, discover businesses, or simply explore new places, ConnectGO provides a seamless experience that combines profiles and locations in a visually engaging and intuitive way.
              </h3>
              <Link to="/explore">
                <Button label="Explore" c="main-btn" type="start" />
              </Link>
            </div>
            <div className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center Graphics-1">
              <img
                src={Vector5}
                alt="Graphical-1"
                height="480px"
                style={{borderRadius: '1rem'}}
              />
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
