import React from 'react';
import Navbar from './Navbar'

function Dashboard(props) {
  return (
    <div>
      <Navbar title={props.title} />
    </div>
  );
}
export default Dashboard;
