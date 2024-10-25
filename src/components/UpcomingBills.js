import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Satellite, Building, Zap } from 'lucide-react';

function UpcomingBills(){
    return(
        <Card>
        <Card.Body>
          <h5>Upcoming bills</h5>
          <h2>$2,560</h2>
          <small>12 — 31 Apr</small>
          <Row className="mt-3">
            <Col xs={4}>
              <Card bg="dark" text="white">
                <Card.Body>
                  <Satellite />
                  <div>$105</div>
                  <small>Starlink</small>
                  <div>13 Apr</div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={4}>
              <Card bg="light">
                <Card.Body>
                  <Building />
                  <div>$730</div>
                  <small>Office</small>
                  <div>17 Apr</div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={4}>
              <Card bg="success" text="white">
                <Card.Body>
                  <Zap />
                  <div>$149</div>
                  <small>Electricity</small>
                  <div>28 Apr</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
}

export default UpcomingBills;