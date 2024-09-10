export default function FormField({
  type,
  name,
  text,
}: {
  type: string;
  name: string;
  text: string;
}) {
  return (
    <>
      <label htmlFor={name}>{text}</label>
      <input type={type} id={name} name={name} required />
    </>
  );
}
