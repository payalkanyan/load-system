export default function LoadList({ loads }: { loads: { origin: string; destination: string; weight: number }[] }) {
    return (
      <ul className="bg-white shadow-md rounded-lg p-6 mt-6">
        {loads.length === 0 ? <p className="text-gray-500">No loads added yet.</p> : loads.map((load, index) => (
          <li key={index} className="border-b py-2 text-lg">🚛 {load.origin} → {load.destination} ({load.weight} kg)</li>
        ))}
      </ul>
    );
  }
  