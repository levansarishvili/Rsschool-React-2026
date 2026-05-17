import { useState } from 'react';

function ErrorButton() {
  const [isCrash, setIsCrashed] = useState(false);

  const handleClick = () => setIsCrashed((prev) => !prev);

  if (isCrash) {
    throw new Error(
      'Simulated render crash: This error was thrown intentionally to test the Error Boundary.'
    );
  }

  return (
    <button
      className="text-sm flex gap-2 bg-red-600 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-red-500 transition-colors"
      onClick={handleClick}
    >
      Test Error Boundary
    </button>
  );
}

export default ErrorButton;
