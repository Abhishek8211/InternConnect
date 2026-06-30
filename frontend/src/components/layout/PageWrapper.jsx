import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * PageWrapper — wraps every page with the Navbar and Footer.
 * Used as the `element` prop on route groups in App.jsx.
 */
const PageWrapper = () => {
  return (
    <div className="flex min-h-dvh flex-col bg-surface text-white">
      <Navbar />
      <main className="flex-1 page-enter">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PageWrapper;
