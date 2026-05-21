type PropsType = {
  error?: string;
  status?: number;
};

export function ErrorState({ error }: PropsType) {
  return (
    <div className="flex flex-col gap-8 justify-center iyems-center">
      <div className="w-full flex justify-center iyems-center">
        <img
          className="w-60"
          src="/assets/page-not-found.svg"
          alt="Page error"
        />
      </div>
      <p className="">Error: {error ?? 'Unknown error'}</p>
    </div>
  );
}
