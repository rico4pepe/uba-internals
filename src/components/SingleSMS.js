import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';

const SingleSMS = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [isCustomMessage, setIsCustomMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Calculate SMS segments and character count
    const characterLimit = 160;
    const segments = Math.ceil(messageContent.length / characterLimit);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate input
        if (!phoneNumber || !messageContent) {
            setErrorMessage("Phone number and message are required.");
            return;
        }

        setErrorMessage(''); // Clear previous error messages
        setSuccessMessage(''); // Clear previous success messages

        const formData = {
            phone_number: phoneNumber,
            message: messageContent,
            is_custom_message: isCustomMessage,
        };

        try {
            const response = await axios.post('/api/send-single-sms', formData);
            setSuccessMessage('SMS sent successfully');
        } catch (error) {
            setErrorMessage('Error sending SMS. Please try again.');
            console.error(error);
        }
    };

    const handleConfirm = () => {
        setIsConfirmed(true);
    };

    return (
        <Container fluid className="p-3" style={{ minHeight: '100vh' }}>
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col md={10} className="d-flex align-items-center justify-content-center">
                    <Card className="w-75 text-center p-4">
                        <Card.Header as="h4">Send Single SMS</Card.Header>
                        <Card.Body>
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                            {successMessage && <Alert variant="success">{successMessage}</Alert>}
                            
                            <Form className="mt-4">
                                <Form.Group controlId="phoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </Form.Group>

                                <Form.Check 
                                    type="radio"
                                    label="Ordinary Message"
                                    name="messageType"
                                    id="ordinaryMessage"
                                    checked={!isCustomMessage}
                                    onChange={() => setIsCustomMessage(false)}
                                />
                                <Form.Check 
                                    type="radio"
                                    label="Custom Message"
                                    name="messageType"
                                    id="customMessage"
                                    checked={isCustomMessage}
                                    onChange={() => setIsCustomMessage(true)}
                                />

                                <Form.Group controlId="messageContent" className="mt-3">
                                    <Form.Label>Enter Your Message</Form.Label>
                                    <Form.Control 
                                        as="textarea"
                                        rows={3}
                                        value={messageContent}
                                        onChange={(e) => setMessageContent(e.target.value)}
                                        placeholder="Write your message here"
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        {messageContent.length} characters ({segments} segment{segments > 1 ? 's' : ''})
                                    </Form.Text>
                                </Form.Group>
                            </Form>

                            {/* Preview & Confirmation Section */}
                            <Card className="mt-4">
                                <Card.Header>Preview</Card.Header>
                                <Card.Body>
                                    <p><strong>Message Type:</strong> {isCustomMessage ? 'Custom Message' : 'Ordinary Message'}</p>
                                    <p className="sms-preview mt-3 p-2" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', backgroundColor: '#f9f9f9', maxWidth: '300px', margin: '0 auto' }}>
                                        {messageContent}
                                    </p>
                                </Card.Body>
                            </Card>

                            {/* Confirm and Send Button */}
                            <Button variant="secondary" className="mt-4 me-2" onClick={handleConfirm}>
                                Confirm Message
                            </Button>

                            {/* Show Send button only if confirmed */}
                            {isConfirmed && (
                                <Button variant="primary" className="mt-4" onClick={handleSubmit}>
                                    Send SMS
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SingleSMS;
