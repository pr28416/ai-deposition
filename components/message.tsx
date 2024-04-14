export default function Message({
  sender,
  message,
}: {
  sender: string;
  message: string;
}) {
  return (
    <div className="flex flex-col gap-2 leading-relaxed">
      <div className="font-semibold">{sender}</div>
      {message}
    </div>
  );
}
