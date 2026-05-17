import { useParams } from 'react-router-dom';

export default function Details() {
  const { id } = useParams();
  return (
    <div className="w-56 h-screen bg-primary/10">
      <p>Product: {id}</p>
    </div>
  );
}
