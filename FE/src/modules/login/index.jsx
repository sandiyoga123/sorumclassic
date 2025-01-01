import { useEffect, useState } from "react";
import { fetchLogin } from "../../API/auth";
import { useToast } from "../../templates/toast/ToastManager";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const addToast = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const nextPage = localStorage.getItem("nextPage");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchLogin(data);
      localStorage.setItem("token", response.data.data.token);

      if (nextPage && nextPage !== "" && response.data.data.role == "user") {
        localStorage.removeItem("nextPage");
        window.location.href = `${nextPage}`;
        return;
      }

      if (response.data.data.role == "admin") {
        window.location.href = "/admin/";
      } else {
        window.location.href = "/";
      }
      addToast(response.data.message, "success");
    } catch (e) {
      addToast(e.response.data.message, "danger");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black to-slate-800 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-3xl font-bold text-white dark:text-white text-center">
          Login ke ShowRoom Classic
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-10">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">Masuk menggunakan akun Anda</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                  value={data.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={data.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                disabled={isLoading}
              >
                {isLoading ? "Menunggu..." : "Masuk"}
              </button>
              <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                Belum punya akun?{" "}
                <a href={"/register"} className="font-medium text-gray-600 hover:underline dark:text-gray-500">
                  Daftar disini
                </a>
              </p>
            </form>
            <a href="/" className="">
              <p className="mt-4 hover:underline">&#x2B60; {"Kembali ke home"}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
