import { Suspense } from "react";

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <div className="pt-8">{children}</div>
    </Suspense>
  );
}
