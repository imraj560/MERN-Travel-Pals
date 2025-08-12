import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { EnvelopeAtFill, CompassFill } from "react-bootstrap-icons";
import './Footer.css'

const Footer = ()=>{

    return(

      <footer>
        <Container>
          
          <Row style={{textAlign:'center', padding:'0px 10px'}}>
          
            <h6 style={{fontWeight:'600'}}>&copy; 2024 Raju Ahmed, Inc (Simple Posting App)</h6>
           
          </Row>
         
        </Container>
       
      </footer>
    )
}

export default Footer;