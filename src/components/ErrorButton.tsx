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
      className="text-xs md:text-sm flex gap-2 items-center justify-center font-mono font-black uppercase tracking-wider text-background bg-danger px-5 py-3 border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(43,41,39,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,239,226,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(43,41,39,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(244,239,226,1)] hover:bg-opacity-95 cursor-pointer transition-all"
      onClick={handleClick}
    >
      <span>💥</span>
      <span>Trigger System Crash</span>
    </button>
  );
}

export default ErrorButton;
