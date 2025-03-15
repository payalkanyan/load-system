'use client'
import { useState } from 'react';
import '../globals.css';

export default function SuperAdmin() {
  const [shippers, setShippers] = useState<string[]>([]);
  const [truckers, setTruckers] = useState<string[]>([]);
  const [name, setName] = useState('');

  const onboardUser = (type: 'shipper' | 'trucker') => {
    if (!name) {
      alert('Enter a valid name!');
      return;
    }
    if (type === 'shipper') {
      setShippers([...shippers, name]);
    } else {
      setTruckers([...truckers, name]);
    }
    setName('');
  };

  return (
    <div className="container">
      <h1>SuperAdmin Dashboard</h1>

      {/* Onboarding Section */}
      <div className="onboard-section">
        <input
          type="text"
          placeholder="Enter Name"
          className="input-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={() => onboardUser('shipper')} className="btn btn-green">
          Onboard Shipper
        </button>
        <button onClick={() => onboardUser('trucker')} className="btn btn-yellow">
          Onboard Trucker
        </button>
      </div>

      {/* Display Shippers and Truckers */}
      <div className="list-container">
        <h2>Shippers:</h2>
        <ul>{shippers.map((s, i) => <li key={i}>🚢 {s}</li>)}</ul>
      </div>

      <div className="list-container">
        <h2>Truckers:</h2>
        <ul>{truckers.map((t, i) => <li key={i}>🚛 {t}</li>)}</ul>
      </div>
    </div>
  );
}
