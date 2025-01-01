import { useEffect, useState } from "react";
import { useToast } from "./toast/ToastManager";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../API/auth";
import { initFlowbite } from "flowbite";
import Footer from "./footer";

const NavbarUser = ({ component: Component }) => {
  initFlowbite();

  const navigate = useNavigate();
  const [user, setUser] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchProfile(token);
        if (response?.data?.data?.role == "admin") {
          navigate(`/admin/`);
        }
        setUser(response.data.data);
      } catch (e) {
        if (e.response.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    };

    if (!token) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      fetch();
    }
  }, []);

  async function handleLogout() {
    localStorage.clear();
    return (window.location.href = "/login");
  }
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white overflow-hidden">SorumClassic</span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
            {!user ? (
              <a
                href={"/login"}
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
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/" className="block py-2 px-3 text-gray-900 hover:bg-gray-100  rounded md:bg-transparent md:text-slate-700 md:p-0 md:dark:text-slate-500" aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/product"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 md:dark:hover:text-slate-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Produk
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 md:dark:hover:text-slate-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  FAQ
                </a>
              </li>
              {user && (
                <li>
                  <a
                    href="/order"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 md:dark:hover:text-slate-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Pesanan
                  </a>
                </li>
              )}
              <li>
                {!user ? (
                  <a
                    href={"/login"}
                    className="sm:hidden block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 md:dark:hover:text-slate-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Masuk
                  </a>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="sm:hidden w-full block py-2 px-3 text-white bg-gray-800 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 md:dark:hover:text-slate-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {user && <Component user={user} token={token} />}
      <Footer />
    </>
  );
};

export default NavbarUser;
