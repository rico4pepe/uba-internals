import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

function RecentTransactions (){

    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

     // Extract data needed, or set default values if they don't exist
  //const firstName = userData ? userData.user.firstname : "User"; // Change "firstName" to the correct key
  //const lastName = userData ? userData.user.lastName : "lastName"; // Change "lastName" to the correct key


    //console.log("User Data", userData.user);

    return (

        <Card className="mb-4">
        <Card.Body>
          <h2>Hey  hello 👋</h2>
          <p>Here are your recent transactions:</p>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
                <img src="/api/placeholder/30/30" alt="Mailchimp" className="me-2 rounded-circle" />
                Mailchimp
              </div>
              <span>-$350</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
                <img src="/api/placeholder/30/30" alt="Atlassian" className="me-2 rounded-circle" />
                Atlassian
              </div>
              <span>-$1,469</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
                <img src="/api/placeholder/30/30" alt="DigitalOcean" className="me-2 rounded-circle" />
                DigitalOcean
              </div>
              <span>-$150</span>
            </ListGroup.Item>
          </ListGroup>
          <a href="#" className="mt-3 d-inline-block">VIEW ALL</a>
        </Card.Body>
      </Card>
    );
}

export default RecentTransactions;