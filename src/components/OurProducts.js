import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function OurProducts (){

  //   // Retrieve user data from local storage
  //   const userData = JSON.parse(localStorage.getItem("userData"));

  //    // Extract data needed, or set default values if they don't exist
  // const providus_account = userData ? userData.user.providus_account : ""; // Change "firstName" to the correct key
  // const sterling_account = userData ? userData.user.sterling_account : ""; // Change "lastName" to the correct key
  // const wema_account = userData ? userData.user.wema_account : "nill";
  // const print_charge = userData ? userData.print_charge : "nill";
  // const bvnverified = userData ? userData.user.bvn_verified : "nill";

  //   console.log("User Data", userData.user);

    return (

        <Card className="mb-4">
        <Card.Body>
          <h2>Our Products</h2>
        
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
           
                Providus Account
              </div>
              <span>-Providus</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
               
                Sterling Account
              </div>
              <span>-Sterling</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
              
                Wema Account
              </div>
              <span>-Wema Account</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
              
                Print Charge
              </div>
              <span>-Print Charge</span>
            </ListGroup.Item>
          </ListGroup>
        
        </Card.Body>
      </Card>
    );
}

export default OurProducts;