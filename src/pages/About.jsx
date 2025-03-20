import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Header />
      <div>
        <section className="py-1">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <img
                  src="https://images.unsplash.com/vector-1742141111605-8d48ffb53239?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Eventify"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6">
                <h6>Welcome to Eventify</h6>
                <h2>Where Experiences Meet Your Interests</h2>
                <p>
                  Your one-stop solution for booking tickets to the most
                  exciting events happening around the world.
                </p>

                <div className="mt-4">
                  <div className="row">
                    <div className="col-md-4">
                      <h3>100+</h3>
                      <p>Events</p>
                    </div>
                    <div className="col-md-4">
                      <h3>10K+</h3>
                      <p>Users</p>
                    </div>
                    <div className="col-md-4">
                      <h3>20+</h3>
                      <p>Countries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5" style={{ backgroundColor: "#D6E4F0" }}>
          <div className="container">
            <h2 className="text-center mb-4">Why Choose Us?</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body text-center">
                    <box-icon
                      color="#3E4A7A"
                      size="lg"
                      name="devices"
                    ></box-icon>
                    <h5 className="card-title">Easy Booking</h5>
                    <p className="card-text text-justify-start">
                      Book your tickets in just a few clicks. It's that easy.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body">
                    <box-icon
                      color="#3E4A7A"
                      size="lg"
                      name="credit-card"
                    ></box-icon>

                    <h5 className="card-title">Secure Payments</h5>
                    <p className="card-text">
                      Your payment details are safe with our secure transaction
                      methods.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center">
                  <div className="card-body">
                    <box-icon
                      color="#3E4A7A"
                      size="lg"
                      name="support"
                    ></box-icon>

                    <h5 className="card-title">24/7 Support</h5>
                    <p className="card-text">
                      Our support team is always available to help you with any
                      issues.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-4">How It Works</h2>
            <div className="row">
              <div className="col-lg-5">
                <img
                  src="https://images.unsplash.com/vector-1738934022244-8f5b0cbf97a5?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="How It Works"
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-7 pt-5">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      Step 1: Log In to Your Account
                    </h5>
                    <p className="card-text">
                      Sign in to your Eventify account using your email and
                      password.
                    </p>
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Step 2: Choose Your Event</h5>
                    <p className="card-text">
                      Explore and find your desired event from our wide
                      selection.
                    </p>
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Step 3: Select Tickets</h5>
                    <p className="card-text">
                      Choose the type and number of tickets for your event.
                    </p>
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Step 3: Checkout</h5>
                    <p className="card-text">
                      Enter payment details, confirm your purchase, and receive
                      your tickets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default About;
