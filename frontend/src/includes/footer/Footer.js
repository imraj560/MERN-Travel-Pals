import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { EnvelopeAtFill, CompassFill } from "react-bootstrap-icons";
import './Footer.css'

const Footer = ()=>{

    return(

      <footer>
        <Container>
          
          <Row style={{textAlign:'left', padding:'0px 10px'}}>
            <Col md={12} lg={3} sm={12} style={{padding:'15px 0px'}}>
            <h6 style={{fontWeight:'600'}}>&copy; 2022 Raju Ahmed, Inc</h6>
            </Col>
            <Col md={12} lg={3} sm={12} style={{padding:'15px 0px'}}>
            <h4 style={{fontWeight:'600'}}>Pages</h4>
            <ul style={{padding:'0px', lineHeight:'30px', listStyleType:'none'}}>
              <li>Gym Locations</li>
              <li>Products</li>
              <li>About Us</li>
            </ul>
            </Col>
            <Col md={12} lg={3} sm={12} style={{padding:'15px 0px'}}>
            <h4 style={{fontWeight:'600'}}>Features</h4>
            <ul style={{padding:'0px', lineHeight:'30px', listStyleType:'none'}}>
              <li>Profile</li>
              <li>Community</li>
              <li>Credit Debit</li>
            </ul>

            </Col>
            <Col md={12} lg={3} sm={12} style={{padding:'15px 0px'}}>
            <h4 style={{fontWeight:'600'}}>Contacts</h4>
            <ul style={{padding:'0px', lineHeight:'30px', listStyleType:'none'}}>
              <li><EnvelopeAtFill/>: raju560.webdev@gmail.com</li>
              <li><CompassFill/>: Quebec, Montreal, Snowden</li>
            
            </ul>
            </Col>
          </Row>
         
        </Container>
       
      </footer>
    )
}

export default Footer;