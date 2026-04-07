import React from 'react';
import Header from '../components/Header';

const About: React.FC = () => {
  return (
    <div>
      <Header />
      
      <section className="about-page">
        <div className="container">
          <h1>About Siva</h1>
          
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Welcome to Siva, your one-stop destination for quality products and exceptional shopping experience. 
                Founded with a vision to make online shopping simple, affordable, and enjoyable, we've been serving 
                customers with dedication and passion since our inception.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                Our mission is to provide customers with a wide range of high-quality products at competitive prices, 
                backed by excellent customer service and a seamless shopping experience. We believe in building lasting 
                relationships with our customers through trust, transparency, and reliability.
              </p>
              
              <h2>What We Offer</h2>
              <ul>
                <li>Curated selection of premium products across multiple categories</li>
                <li>Competitive pricing and regular promotions</li>
                <li>Secure and convenient payment options</li>
                <li>Fast and reliable delivery</li>
                <li>Excellent customer support</li>
                <li>Easy returns and exchanges</li>
              </ul>
              
              <h2>Our Values</h2>
              <p>
                At Siva, we are guided by core values that shape everything we do:
              </p>
              <ul>
                <li><strong>Quality:</strong> We never compromise on product quality</li>
                <li><strong>Customer First:</strong> Your satisfaction is our top priority</li>
                <li><strong>Innovation:</strong> We constantly improve our services and technology</li>
                <li><strong>Integrity:</strong> We conduct business with honesty and transparency</li>
                <li><strong>Sustainability:</strong> We are committed to environmentally responsible practices</li>
              </ul>
            </div>
            
            <div className="about-stats">
              <div className="stat">
                <h3>10,000+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Quality Products</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>Customer Support</p>
              </div>
              <div className="stat">
                <h3>99%</h3>
                <p>Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
