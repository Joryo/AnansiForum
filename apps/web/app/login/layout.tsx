export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-grow justify-center items-center flex-col">
      {children}
    </section>
  );
}
