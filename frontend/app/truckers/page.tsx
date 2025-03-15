'use client'
import { useState, useEffect } from 'react';

interface Load {
  id: string;
  origin: string;
  destination: string;
  weight: string;
  time: string;
  lowestBid: number | null;
  winner: string | null;
}

export default function TruckersPage() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [bids, setBids] = useState<{ [key: string]: number }>({});
  const [search, setSearch] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<string>('');

  // Load initial data (mock or from localStorage)
  useEffect(() => {
    const storedLoads = JSON.parse(localStorage.getItem('loads') || '[]');
    if (storedLoads.length === 0) {
      const mockLoads = [
        { id: '1', origin: 'NYC', destination: 'LA', weight: '50kg', time: '2025-03-15 10:00', lowestBid: null, winner: null },
        { id: '2', origin: 'SF', destination: 'TX', weight: '30kg', time: '2025-03-16 12:00', lowestBid: null, winner: null }
      ];
      localStorage.setItem('loads', JSON.stringify(mockLoads));
      setLoads(mockLoads);
    } else {
      setLoads(storedLoads);
    }
  }, []);

  // Function to place a bid
  const placeBid = (loadId: string, bidAmount: number) => {
    if (!bidAmount || bidAmount <= 0) {
      alert('Enter a valid bid amount!');
      return;
    }

    setLoads((prevLoads) =>
      prevLoads.map((load) => {
        if (load.id === loadId && (load.lowestBid === null || bidAmount < load.lowestBid)) {
          return { ...load, lowestBid: bidAmount, winner: 'You' };
        }
        return load;
      })
    );

    // Store new bid in local storage
    localStorage.setItem(
      'loads',
      JSON.stringify(
        loads.map((load) =>
          load.id === loadId && (load.lowestBid === null || bidAmount < load.lowestBid)
            ? { ...load, lowestBid: bidAmount, winner: 'You' }
            : load
        )
      )
    );
  };

  // Filtering based on search and time
  const filteredLoads = loads.filter((load) => {
    const matchesRoute =
      load.origin.toLowerCase().includes(search.toLowerCase()) ||
      load.destination.toLowerCase().includes(search.toLowerCase());

    const matchesTime =
      !timeFilter || new Date(load.time) >= new Date(timeFilter);

    return matchesRoute && matchesTime;
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-6">
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-white text-center">🚛 Available Loads</h1>

        {/* Search & Time Filter */}
        <div className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Search by origin or destination..."
            className="border p-2 w-full rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="datetime-local"
            className="border p-2 w-full rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          />
        </div>

        {filteredLoads.length === 0 ? (
          <p className="mt-4 text-white text-center">No matching loads found.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {filteredLoads.map((load) => (
              <li key={load.id} className="bg-white bg-opacity-30 p-4 rounded-lg shadow-md">
                <p className="text-lg font-semibold text-white">
                  <span className="font-bold">Route:</span> {load.origin} → {load.destination} ({load.weight})
                </p>
                <p className="text-white">
                  <span className="font-bold">Time:</span> {load.time}
                </p>
                <p className="text-white">
                  <span className="font-bold">Lowest Bid:</span> {load.lowestBid !== null ? `$${load.lowestBid}` : 'No bids yet'}
                </p>
                <p className="text-white">
                  <span className="font-bold">Winner:</span> {load.winner || 'No winner yet'}
                </p>

                {load.winner === 'You' ? (
                  <button className="bg-gray-500 px-4 py-2 mt-2 text-white rounded-md w-full" disabled>
                    ✅ You Won the Load
                  </button>
                ) : (
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Enter bid amount"
                      className="border p-2 w-24 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={bids[load.id] || ''}
                      onChange={(e) =>
                        setBids((prev) => ({ ...prev, [load.id]: parseFloat(e.target.value) || 0 }))
                      }
                    />
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
                      onClick={() => placeBid(load.id, bids[load.id])}
                    >
                      💸 Place Bid
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
