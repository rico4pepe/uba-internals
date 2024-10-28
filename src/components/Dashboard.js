import React, { useEffect }  from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import RecentTransactions from './RecentTransactions';
import UserVerification from './UserVerfications';
import Airtel from './Airtel';
import Globacom from './Globacom';
import NineMobile from './NineMobile';


import UpcomingBills from './UpcomingBills';
import Wallet from './Wallet';
//import { useAuth } from './useAuth'; // Import the custom hook
import useInactivityLogout from './utilities/useInactivityLogout';

function Dashboard() {

  //const token = localStorage.getItem("token");


    // Retrieve user data from local storage
    //const userData = JSON.parse(localStorage.getItem("userData"));

  useInactivityLogout();

  // console.log("Token: ", token);

  // if (!token) {
  //   return <Navigate to="/" />; // Redirect to sign-in if not authenticated
  // }

  
  return (
    <Container fluid className="p-3">
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Header />
          <Row>
            <Col md={6}>
              <UserVerification />
            </Col>
            <Col md={6}>
            <Airtel />
            </Col>
          </Row>
          {/* UpcomingBills and Wallet side by side */}
          <Row className="mt-4"> 
            <Col md={6}> {/* Stretch UpcomingBills to half of the available width */}
            <Globacom />
            </Col>
            <Col md={6}> {/* Stretch Wallet to half of the available width */}
            <NineMobile />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
