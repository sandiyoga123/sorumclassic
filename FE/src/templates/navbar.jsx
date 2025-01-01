import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../API/auth";
import Footer from "./footer";
import { Navbar } from "flowbite-react";

const NavbarComponent = ({ component: Component }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchProfile(token);
        if (response?.data?.data?.role == "admin") {
          window.location.href = "/admin/";
        }
        setUser(response.data.data);
      } catch (e) {
        if (e.response.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    };
    if (token) {
      fetch();
    }
  }, []);

  async function handleLogout() {
    localStorage.clear();
    return (window.location.href = "/login");
  }

  const customTheme = {
    root: {
      base: "bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600",
      inner: {
        base: "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4",
      },
    },
    brand: {
      base: "flex items-center space-x-3 rtl:space-x-reverse",
    },
    collapse: {
      base: "items-center justify-between w-full md:flex md:w-auto md:order-1",
      list: "flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700",
    },
    link: {
      base: "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 md:dark:hover:text-slate-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700",
      active: {
        on: "text-gray-900 bg-transparent md:text-slate-700 md:dark:text-slate-500",
        off: "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 md:dark:hover:text-slate-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700",
      },
    },
    toggle: {
      base: "inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
    },
  };

  return (
    <>
      <Navbar theme={customTheme}>
        <Navbar.Brand href="/">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white overflow-hidden">SorumClassic</span>
        </Navbar.Brand>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
          <Navbar.Toggle />
          {!user ? (
            <a
              href="/login"
              className="hidden sm:inline text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            >
              Masuk
            </a>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden sm:inline text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
            >
              Logout
            </button>
          )}
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/product">Produk</Navbar.Link>
          <Navbar.Link href="/faq">FAQ</Navbar.Link>
          {user && <Navbar.Link href="/order">Pesanan</Navbar.Link>}
          {/* Mobile login/logout button */}
          <div className="sm:hidden">
            {!user ? (
              <Navbar.Link href="/login">Masuk</Navbar.Link>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full block py-2 px-3 text-white bg-gray-800 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 md:dark:hover:text-slate-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Logout
              </button>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Component user={user} />
      <Footer />
    </>
  );
};

export default NavbarComponent;
