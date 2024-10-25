// BatchSMS.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (files.length === 0) {
            setErrorMessage("Please upload at least one file.");
            return;
        }

        setErrorMessage(''); // Clear any previous error messages

        // Form data for backend
        const formData = new FormData();
        formData.append('file', files[0].file);  // Assuming single file
        formData.append('isCustomMessage', isCustomMessage);

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
                            </Form>
                            <Button variant="primary" className="mt-4" onClick={handleSubmit}>
                                Upload Files
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BatchSMS;
