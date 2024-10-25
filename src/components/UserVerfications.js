import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function UserVerification (){

    // Retrieve user data from local storage
    // const userData = JSON.parse(localStorage.getItem("userData"));

  //    // Extract data needed, or set default values if they don't exist
  // const firstName = userData ? userData.user.firstname : "User"; // Change "firstName" to the correct key
  // const lastName = userData ? userData.user.lastName : "lastName"; // Change "lastName" to the correct key
  // const phoneverified = userData ? userData.user.phone_verified : "nill";
  // const emailverified = userData ? userData.user.email_verified : "nill";
  // const bvnverified = userData ? userData.user.bvn_verified : "nill";

   // console.log("User Data", userData.user);

    return (

        <Card className="mb-4">
        <Card.Body>
          <h2>Hey  Jane 👋</h2>
          <p>Here are your verifications:</p>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
           
                Phone Verified
              </div>
              <span>-Verified Phone</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
               
                Email Verified
              </div>
              <span>-Email</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
              
                Bvn Verified
              </div>
              <span>-BVN </span>
            </ListGroup.Item>
          </ListGroup>
          
        </Card.Body>
      </Card>
    );
}

export default UserVerification;