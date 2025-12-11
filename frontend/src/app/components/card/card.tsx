export function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-zinc-700 p-6 rounded-xl shadow-xl">
      <h2 className="text-lg opacity-70">{title}</h2>
      <p className="text-4xl font-semibold mt-2">{value}</p>
    </div>
  );
}
