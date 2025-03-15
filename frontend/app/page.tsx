'use client'
import { useRouter } from 'next/navigation';
import './globals.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className="container">
      <h1>🚛 Truck Load Bidding App</h1>
      <p>Choose your role to proceed:</p>
      
      <div>
        <button onClick={() => router.push('/superadmin')} className="btn-orange">
          SuperAdmin Dashboard
        </button>
        
        <button onClick={() => router.push('/shipper')} className="btn-purple">
          Shipper Dashboard
        </button>
        
        <button onClick={() => router.push('/truckers')} className="btn-orange">
          Trucker Dashboard
        </button>
      </div>
    </div>
  );
}
