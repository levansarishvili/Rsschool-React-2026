import { Sparkle } from 'lucide-react';
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
      onClick={handleClick}
      className="text-xs md:text-sm flex gap-2 items-center justify-center font-sans font-medium tracking-wide text-danger bg-danger/10 border border-danger/20 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-danger hover:text-white hover:border-danger hover:shadow-sm hover:shadow-danger/15 active:scale-98 select-none"
    >
      <Sparkle className="w-4 h-4" />
      <span>Trigger Test Error</span>
    </button>
  );
}

export default ErrorButton;
