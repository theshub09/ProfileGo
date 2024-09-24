
import React from 'react'
import AboutItem from '../components/AboutItem'


export default function AboutUs() {
    return(
        <section id="about">
        <div className="container-fluid px-0">

            <div className="container mb-md-0 mt-5">
            <h1 className="heading-text au-text">About Us</h1>

           
            <div className="row mt-lg-3 d-flex align-items-center justify-content-center">
                <div className="col-lg-12 col-md-12 mt-3 aboutus-main-card">
                
                    <AboutItem
                        q = "Welcome to ConnectGO!"
                        a = "At ConnectGO, we make connections as easy to explore as the places around us. Our platform bridges the gap between people and locations, offering users the ability to view profiles and interact with their associated places on a dynamic map. Whether you're looking for a business, a professional, or simply exploring new connections, ConnectGO brings the world to your fingertips—one profile, one location at a time. Through detailed profiles and map-based exploration, we provide a unique and engaging way to discover people and places worldwide."
                    />

                    <AboutItem
                        q = "Our Vision: "
                        a = "
To seamlessly connect profiles and places, empowering users to discover, connect, and explore effortlessly. Our goal is to become the leading platform for individuals and businesses looking to connect through location-based profiles."
                    />
                   
                    <AboutItem
                        q = "Contact Us :"
                        a = "We’d love to hear from you! For any questions, feedback, or inquiries, reach out to us:
Email: contactus@connectgo.com
Phone: +91 1232345456
Office Address: Parallel world Building, Vijaynagar, Pune, Maharashtra, India."
                    />
                </div>
            </div>
            </div>

        </div>
        </section>
    )
}