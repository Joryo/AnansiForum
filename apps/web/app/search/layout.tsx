import { Suspense } from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <section>
        <div className="flex flex-col gap-6 px-6">{children}</div>
      </section>
    </Suspense>
  );
}
