type PropsType = {
  error?: string;
  status?: number;
};

export function ErrorState({ error }: PropsType) {
  return (
    <div className="flex flex-col gap-4">
      <img className="w-80" src="./assets/page-error.jpg" alt="Page error" />
      <p className="">Error: {error ?? 'Unknown error'}</p>
    </div>
  );
}
