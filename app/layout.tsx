import type { Metadata } from "next";
import "./index.css"; // atau globals.css, sesuaikan

export const metadata: Metadata = {
  title: "SiapKerja",
  description: "Job readiness checklist platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
