'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../globals.css';

interface Load {
  id: string;
  origin: string;
  destination: string;
  weight: string;
}

export default function Dashboard() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    const storedLoads = JSON.parse(localStorage.getItem('loads') || '[]');
    setLoads(storedLoads);
  }, []);

  const postLoad = () => {
    if (origin && destination && weight) {
      const newLoad = { id: Date.now().toString(), origin, destination, weight };

      const updatedLoads = [...loads, newLoad];
      setLoads(updatedLoads);

      localStorage.setItem('loads', JSON.stringify(updatedLoads));

      setOrigin('');
      setDestination('');
      setWeight('');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>🚚 Shipper Dashboard</h1>

      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button className="btn-blue" onClick={postLoad}>
        Post Load
      </button>

      <ul className="load-list">
        {loads.length === 0 ? (
          <p>No loads added yet.</p>
        ) : (
          loads.map((load) => (
            <li key={load.id} className="load-item">
              <strong>Route:</strong> {load.origin} → {load.destination} ({load.weight} kg)
            </li>
          ))
        )}
      </ul>

      <Link href="/bidding" className="link">
        Go to Bidding Page
      </Link>

      <Link href="/truckers" className="btn-blue link">
        View Available Loads
      </Link>
    </div>
  );
}
