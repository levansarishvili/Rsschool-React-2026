type PropsType = {
  error?: string;
  status?: number;
};

export function ErrorState({ error }: PropsType) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="flex flex-col gap-8 justify-center iyems-center">
      <div className="w-full flex justify-center iyems-center">
        <img
          className="w-60"
          src={`${baseUrl}/assets/page-not-found.svg`}
          alt="Page not found"
        />
      </div>
      <p className="">Error: {error ?? 'Unknown error'}</p>
    </div>
  );
}
