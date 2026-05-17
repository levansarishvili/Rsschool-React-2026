type PropsType = {
  message: string;
};

export function EmptyState({ message }: PropsType) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <img
        className="w-56"
        src={`${baseUrl}/assets/data-not-found.svg`}
        alt="Item not found"
      />
      <p className="">{message}</p>
    </div>
  );
}
