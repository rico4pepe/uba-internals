import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const chartData = [
    { name: 'Mar 1', value: 1000 },
    { name: 'Mar 5', value: 1200 },
    { name: 'Mar 10', value: 900 },
    { name: 'Mar 15', value: 1500 },
    { name: 'Mar 20', value: 1800 },
  ];

  function BalanceChart (){
    return(
        <Card>
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Balance</h5>
        <Button variant="dark" size="sm">Analytics</Button>
      </div>
      <h2>$1,636,500</h2>
      <p>Tuesday, 18 days ago</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Card.Body>
  </Card>
    );
  }

  export default BalanceChart;