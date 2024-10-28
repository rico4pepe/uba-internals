import React from 'react';
import { Card, ListGroup, ProgressBar } from 'react-bootstrap';

function Airtel() {
  // Sample verification rates (0-100) for demonstration
  const verificationData = [
    {
      label: "Delivered",
      status: 100, // Example: 100% for verified
      variant: "success" 
    
    },
    {
      label: "Undelivered",
      status: 80, // Example: 80% for verified
      variant: "info"
    
    },
    {
      label: "Expired",
      status: 50, // Example: 50% for verified
      variant: "warning" 
   
    }
  ];

  return (
    <Card className="mb-4">
      <Card.Body>
        <h2>Airtel 👋</h2>
        <p>Delivery Ratio</p>
        <ListGroup variant="flush">
          {verificationData.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <div>
                {item.label}
              </div>
              <span>{item.message}</span>
              <ProgressBar now={item.status} label={`${item.status}%`} variant={item.variant}  style={{ width: '200px', marginLeft: '10px' }} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Airtel;
