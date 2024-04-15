import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import { initAction } from "./_initActions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Palworld Deck",
  description: "Full collection of all the Pals avaliable in the game, Palworld.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await initAction();
  return (
    <html lang="en">
      <body className={[inter.className, "flex flex-col h-screen w-screen"].join(" ")}> 
        {children}
      </body>
    </html>
  );
}
