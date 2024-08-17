import { Inter } from "next/font/google";
import "./globals.css";
import { MyProvider } from "./context/MyContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FYI STORE",
  description: "get whatever you whant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyProvider>
          <Toaster />
          {children}
        </MyProvider>
      </body>
    </html>
  );
}
