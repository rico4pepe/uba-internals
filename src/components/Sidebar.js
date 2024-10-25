import React, { useState } from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { Home, MessageCircle, User, LogOut, Calendar, MessageSquare, FileText, BarChart, Eye, Globe, DollarSign } from 'lucide-react';

function Sidebar() {
  const [showSMSDropdown, setShowSMSDropdown] = useState(false);
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);

  const handleSMSMouseEnter = () => setShowSMSDropdown(true);
  const handleSMSMouseLeave = () => setShowSMSDropdown(false);

  const handleReportsMouseEnter = () => setShowReportsDropdown(true);
  const handleReportsMouseLeave = () => setShowReportsDropdown(false);

  return (
    <div className="sidebar">
      <Nav className="flex-column p-3">
        <Nav.Item className="sidebar-header mb-4">
          <h4>UBA</h4>
        </Nav.Item>

        {/* Home Link */}
        <Nav.Link href="/" className="mb-3">
          <Home className="me-2" /> Home
        </Nav.Link>

        {/* SMS Dropdown */}
        <Dropdown
          className="mb-3"
          onMouseEnter={handleSMSMouseEnter}
          onMouseLeave={handleSMSMouseLeave}
          show={showSMSDropdown}
        >
          <Dropdown.Toggle variant="link" className="text-decoration-none">
            <MessageCircle className="me-2" /> SMS
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/sms/single">
              <MessageSquare className="me-2" /> Single SMS
            </Dropdown.Item>
            <Dropdown.Item href="/batch-sms">
              <MessageSquare className="me-2" /> Batch SMS
            </Dropdown.Item>
            <Dropdown.Item href="/sms/personalise">
              <User className="me-2" /> Personalised SMS
            </Dropdown.Item>
            <Dropdown.Item href="/sms/schedule">
              <Calendar className="me-2" /> Schedule SMS
            </Dropdown.Item>
            <Dropdown.Item href="/sms/template">
              <FileText className="me-2" /> Message Template
            </Dropdown.Item>
            <Dropdown.Item href="/sms/preview">
              <Eye className="me-2" /> SMS Preview
            </Dropdown.Item>
            <Dropdown.Item href="/sms/international">
              <Globe className="me-2" /> SMS to International Number
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Reports Dropdown */}
        <Dropdown
          className="mb-3"
          onMouseEnter={handleReportsMouseEnter}
          onMouseLeave={handleReportsMouseLeave}
          show={showReportsDropdown}
        >
          <Dropdown.Toggle variant="link" className="text-decoration-none">
            <BarChart className="me-2" /> Reports
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/reports/delivery">
              <FileText className="me-2" /> Delivery Report
            </Dropdown.Item>
            <Dropdown.Item href="/reports/payment">
              <DollarSign className="me-2" /> Payment Report
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Logout Link */}
        <Nav.Link href="/logout" className="mb-3">
          <LogOut className="me-2" /> Logout
        </Nav.Link>

        {/* Footer */}
        <div className="mt-auto pt-3">
          <small>© UBA</small>
        </div>
      </Nav>
    </div>
  );
}

export default Sidebar;
