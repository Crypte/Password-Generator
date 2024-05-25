interface ListProps {
  className?: string;
  data: String[];
}

export const List = ({ className, data }: ListProps) => {
  return (
    <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${className}`}>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
