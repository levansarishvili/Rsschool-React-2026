type PropsType = {
  message: string;
};

export default function Loader({ message }: PropsType) {
  return (
    <div className="flex flex-col items-center justify-center py-32 my-auto">
      <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin" />
      <span className="text-xs font-medium tracking-wide text-text-muted mt-4">
        {message}
      </span>
    </div>
  );
}
