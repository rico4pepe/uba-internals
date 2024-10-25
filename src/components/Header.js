import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Search, Send } from 'lucide-react';

function Header (){

    return (
        <Row className="mb-4 align-items-center">
        <Col>
          <Form.Group className="position-relative">
            <Search className="position-absolute top-50 translate-middle-y ms-3" />
            <Form.Control type="text" placeholder="Search by account, merchant, date, category, or amount" className="ps-5" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" className="me-2">
            Send money <Send className="ms-2" size={16} />
          </Button>
          <img src="/api/placeholder/40/40" alt="Profile" className="rounded-circle" />
        </Col>
      </Row>
    );
}

export default Header;
