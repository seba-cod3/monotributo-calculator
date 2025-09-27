export function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  );
}
