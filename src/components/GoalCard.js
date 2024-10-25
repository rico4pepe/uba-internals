import React from 'react';
import { Card, Button } from 'react-bootstrap';

function GoalCard(){
    return (
        <Card>
    <Card.Body className="text-center">
      <img src="/api/placeholder/100/100" alt="Reach money goals faster" className="mb-3" />
      <h5>Reach money goals faster</h5>
      <Button variant="dark">Start</Button>
    </Card.Body>
  </Card>
    );
}

export default GoalCard;