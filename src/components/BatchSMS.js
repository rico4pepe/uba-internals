import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Accordion } from 'react-bootstrap';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import Sidebar from './Sidebar';
import axios from 'axios';

// Register the plugin
registerPlugin(FilePondPluginFileValidateType);

const BatchSMS = () => {
    const [files, setFiles] = useState([]);
    const [isCustomMessage, setIsCustomMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [uploadResult, setUploadResult] = useState(null);
    const [scheduleDate, setScheduleDate] = useState('');
    const [campaignTitle, setCampaignTitle] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [isScheduled, setIsScheduled] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Calculate SMS segments and character count
    const characterLimit = 160;
    const segments = Math.ceil(messageContent.length / characterLimit);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (files.length === 0) {
            setErrorMessage("Please upload at least one file.");
            return;
        }

        setErrorMessage(''); // Clear any previous error messages

        const formData = new FormData();
        formData.append('file', files[0].file);
        formData.append('isCustomMessage', isCustomMessage);
        formData.append('campaignTitle', campaignTitle);
        formData.append('messageContent', isCustomMessage ? '' : messageContent);

        if (isScheduled) {
            formData.append('scheduleDate', scheduleDate);
            formData.append('scheduleTime', scheduleTime);
        }

        try {
            const response = await axios.post('/api/import-sms', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setUploadResult(response.data.summary);
        } catch (error) {
            setErrorMessage('Error uploading file. Please try again.');
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
                        <Card.Header as="h4">Batch SMS Upload</Card.Header>
                        <Card.Body>
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                            {uploadResult && (
                                <Alert variant="success">
                                    {`Successfully uploaded: ${uploadResult.successCount}, Failed: ${uploadResult.failCount}`}
                                    {uploadResult.errors && (
                                        <ul>
                                            {uploadResult.errors.map((err, idx) => (
                                                <li key={idx}>{err}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Alert>
                            )}
                            <FilePond
                                files={files}
                                onupdatefiles={setFiles}
                                allowMultiple={false}
                                acceptedFileTypes={['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']}
                                labelIdle='Drag & drop your files or <span class="filepond--label-action">Browse</span>'
                            />
                            <Form className="mt-4">
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

                                {/* Conditional Text Area for Ordinary Message */}
                                {!isCustomMessage && (
                                    <Form.Group controlId="messageContent" className="mt-3">
                                        <Form.Label>Enter Your Message</Form.Label>
                                        <Form.Control 
                                            as="textarea"
                                            rows={3}
                                            value={messageContent}
                                            onChange={(e) => setMessageContent(e.target.value)}
                                            placeholder="Write your message here"
                                        />
                                        <Form.Text className="text-muted">
                                            {messageContent.length} characters ({segments} segment{segments > 1 ? 's' : ''})
                                        </Form.Text>
                                    </Form.Group>
                                )}
                            </Form>
                            
                            {/* Collapsible panel for Scheduling Options */}
                            <Accordion className="mt-4">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header onClick={() => setIsScheduled(!isScheduled)}>
                                        Scheduling Options
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Group className="mt-3">
                                            <Form.Check 
                                                type="checkbox"
                                                label="Schedule SMS Campaign"
                                                checked={isScheduled}
                                                onChange={(e) => setIsScheduled(e.target.checked)}
                                            />
                                        </Form.Group>

                                        {isScheduled && (
                                            <>
                                                <Form.Group className="mt-3">
                                                    <Form.Label>Campaign Title (optional)</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="Enter campaign title" 
                                                        value={campaignTitle}
                                                        onChange={(e) => setCampaignTitle(e.target.value)} 
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mt-3">
                                                    <Form.Label>Schedule Date</Form.Label>
                                                    <Form.Control 
                                                        type="date"
                                                        value={scheduleDate}
                                                        onChange={(e) => setScheduleDate(e.target.value)}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mt-3">
                                                    <Form.Label>Schedule Time</Form.Label>
                                                    <Form.Control 
                                                        type="time"
                                                        value={scheduleTime}
                                                        onChange={(e) => setScheduleTime(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            {/* Preview & Confirmation Section */}
                            <Card className="mt-4">
                                <Card.Header>Preview & Confirmation</Card.Header>
                                <Card.Body>
                                {isScheduled && (
            <>
                {campaignTitle && <p><strong>Campaign Title:</strong> {campaignTitle}</p>}
                <p><strong>Schedule:</strong> {scheduleDate ? `${scheduleDate} at ${scheduleTime}` : 'Immediate'}</p>
            </>
        )}

        <p><strong>Message Type:</strong> {isCustomMessage ? 'Custom Message' : 'Ordinary Message'}</p>
                                    {/* SMS Preview */}
                                    {!isCustomMessage && (
                                        <div className="sms-preview mt-3 p-2" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', backgroundColor: '#f9f9f9', maxWidth: '300px', margin: '0 auto' }}>
                                            <p style={{ fontSize: '14px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{messageContent}</p>
                                            <p className="text-muted mt-2" style={{ fontSize: '12px' }}>
                                                {messageContent.length} characters ({segments} segment{segments > 1 ? 's' : ''})
                                            </p>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>

                               {/* Confirm and Upload Buttons */}
                               <Button variant="secondary" className="mt-4 me-2" onClick={handleConfirm}>
                                Confirm Message
                            </Button>

                            {/* Show Upload button only if confirmed */}
                            {isConfirmed && (
                                <Button variant="primary" className="mt-4" onClick={handleSubmit}>
                                      {isScheduled ? 'Save Campaign' : 'Upload Files'}
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BatchSMS;
