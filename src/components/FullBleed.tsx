export function FullBleed({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className={`w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] ${className}`}>
      {children}
    </div>
  );
}
