type PropsType = {
  error?: string;
  status?: number;
};

export function ErrorState({ error }: PropsType) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="flex flex-col gap-4">
      <img
        className="w-80"
        src={`${baseUrl}/assets/page-not-found.svg`}
        alt="Page not found"
      />
      <p className="">Error: {error ?? 'Unknown error'}</p>
    </div>
  );
}
