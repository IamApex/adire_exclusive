import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { ReactLenis } from "lenis/dist/lenis-react";
import ScrollToTop from "./_components/ScrollToTop";
import GeoLocalization from "./_components/GeoLocalization";

export const metadata = {
  title: "Adire Exclusive",
  description: "Generated by create next app",
};

export default function RootLayout({ children, modals }) {
  return (
    <html lang="en" className="scrollbar-hidden">
      <body
        className={`font-primary antialiased overflow-x-hidden box-border relative`}
      >
        <ReactLenis root>
          <Navbar />
          <GeoLocalization />
          {children}
          {modals}
          <ScrollToTop />
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
