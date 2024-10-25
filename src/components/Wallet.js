import React from 'react';
import { Card } from 'react-bootstrap';

function Wallet() {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("userData"));

    const walletBalance = userData ? userData.balance : "0.00"; // Give it a default value
    return (
        <Card>
        <Card.Body>
          <h5>Your wallet</h5>
          <Card bg="light" className="mt-3">
            <Card.Body>
              <h2>${walletBalance}</h2>
              <img src="/api/placeholder/50/30" alt="Card" className="mt-2" />
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    );
}

export default Wallet;