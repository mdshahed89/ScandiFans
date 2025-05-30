import type { Metadata } from "next";
import "./globals.css";
import { FormProvider } from "@/context/Context";



export const metadata: Metadata = {
  title: "Scandifans",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={` font-Inter `}>
        <FormProvider >
        {children}
        </FormProvider>
      </body>
    </html>
  );
}
