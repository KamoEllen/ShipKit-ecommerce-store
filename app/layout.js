import "./globals.css";
import './fanta.css'
import Head from "./head";
import Link from "next/link";
import Cart from "@/components/Cart";
import EmailInput from "@/components/EmailInput";
import ProductsProvider from "@/context/ProductContext";

export const metadata = {
  title: "ShipKit",
  description: "Dev-first digital tools. Fewer tabs. More flow.",
};

export default function RootLayout({ children }) {
  return (
    <ProductsProvider>
      <html lang="en">
        <Head />
        <body >
          <div id="portal" />
          <div id="app" >
            <header>
              <div className="header-content">
                <Link href={'/'}>
                  <h1>ShipKit</h1>
                </Link>
                <h5 className="mid-text">- Tools for Devs Who Ship Fast-</h5>
                <Cart />
              </div>
            </header>

            <main>
              {children}
            </main>
            <div className="hr" />

            <footer>
              <div className="email-container">
                <h5>Be first in line for new drops, launch tools, and shipping
                  shortcuts.</h5>
                <EmailInput />
              </div>

              <div className="links-container">
                <div>
                  <h3>ShipKit</h3>
                  <Link target="_blank" href={'/'}>ShipKit Hub</Link>
                  <Link target="_blank" href={'/'}>Roadmap</Link>
                </div>
                <div>
                  <h3>Store</h3>
                  <Link href={'/'}>Home</Link>
                  <Link href={'/cart'}>Cart</Link>
                </div>
                <div>
                  <h3>Support</h3>
                  <Link href={'/contact'}>Contact</Link>
                  <Link href={'/faq'}>FAQs</Link>
                </div>
              </div>

              <div className="socials">
                
                <div className="social-links">
                  <Link href={'/'} target="_blank"><i className="fa-brands fa-github"></i></Link>
                  <Link href={'/'} target="_blank"><i className="fa-brands fa-youtube"></i></Link>
                  <Link href={'/'} target="_blank"><i className="fa-brands fa-linkedin"></i></Link>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ProductsProvider>
  );
}
