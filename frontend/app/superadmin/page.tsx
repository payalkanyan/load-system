'use client'
import { useState } from 'react';
import '../globals.css';

export default function SuperAdmin() {
  const [shippers, setShippers] = useState<string[]>([]);
  const [truckers, setTruckers] = useState<{ name: string; eligible: boolean }[]>([]);
  
  const [shipperName, setShipperName] = useState('');
  const [truckerName, setTruckerName] = useState('');
  const [truckAge, setTruckAge] = useState('');
  const [licenseYears, setLicenseYears] = useState('');
  const [hasAccidents, setHasAccidents] = useState(false);
  const [hasTheftComplaints, setHasTheftComplaints] = useState(false);

  const onboardUser = (type: 'shipper' | 'trucker') => {
    if (type === 'shipper') {
      if (!shipperName) {
        alert('Enter a valid shipper name!');
        return;
      }
      setShippers([...shippers, shipperName]);
      setShipperName('');
    } else {
      if (!truckerName) {
        alert('Enter a valid trucker name!');
        return;
      }
      
      const truckAgeNum = parseInt(truckAge);
      const licenseYearsNum = parseInt(licenseYears);

      if (hasAccidents || hasTheftComplaints) {
        alert('Trucker does not meet eligibility (No accidents or theft complaints allowed).');
        return;
      }

      if (truckAgeNum > 5) {
        alert('Trucker does not meet eligibility (Truck must be ≤ 5 years old).');
        return;
      }

      if (licenseYearsNum < 5) {
        alert('Trucker does not meet eligibility (License must be held for >5 years).');
        return;
      }

      setTruckers([...truckers, { name: truckerName, eligible: true }]);
      setTruckerName('');
      setTruckAge('');
      setLicenseYears('');
      setHasAccidents(false);
      setHasTheftComplaints(false);
    }
  };

  return (
    <div className="container">
      <h1>SuperAdmin Dashboard</h1>

      {/* Two Sections Side by Side */}
      <div className="flex-container">
        {/* Shipper Onboarding */}
        <div className="onboard-card">
          <h2 className='title'>Onboard Shipper</h2>
          <input
            type="text"
            placeholder="Enter Name"
            className="input-box"
            value={shipperName}
            onChange={(e) => setShipperName(e.target.value)}
          />
          <button onClick={() => onboardUser('shipper')} className="btn btn-green">
            Onboard Shipper
          </button>

          {/* Display Shippers List */}
          <div className="list-container">
            <h2 className='title'>Shippers:</h2>
            <ul>{shippers.map((s, i) => <li key={i}>🚢 {s}</li>)}</ul>
          </div>
        </div>

        {/* Trucker Onboarding */}
        <div className="onboard-card">
          <h2 className='title'>Onboard Trucker</h2>
          <input
            type="text"
            placeholder="Enter Name"
            className="input-box"
            value={truckerName}
            onChange={(e) => setTruckerName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Truck Age (years)"
            className="input-box"
            value={truckAge}
            onChange={(e) => setTruckAge(e.target.value)}
          />
          <input
            type="number"
            placeholder="License Held (years)"
            className="input-box"
            value={licenseYears}
            onChange={(e) => setLicenseYears(e.target.value)}
          />

          {/* Checkboxes */}
          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={hasAccidents}
                onChange={() => setHasAccidents(!hasAccidents)}
              />
              No Accident History
            </label>
            <label>
              <input
                type="checkbox"
                checked={hasTheftComplaints}
                onChange={() => setHasTheftComplaints(!hasTheftComplaints)}
              />
              No Theft Complaints
            </label>
          </div>

          <button onClick={() => onboardUser('trucker')} className="btn btn-green">
            Onboard Trucker
          </button>

          {/* Display Truckers List UNDER the trucker form */}
          <div className="list-container">
            <h2 className='title'>Truckers:</h2>
            <ul>
              {truckers.map((t, i) => (
                <li key={i}>🚛 {t.name} {t.eligible ? '✅ Eligible' : '❌ Not Eligible'}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
