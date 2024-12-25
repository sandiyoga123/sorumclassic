import { useEffect, useState } from "react";
import { fetchLogin, fetchRegister } from "../../API/auth";
import { useToast } from "../../templates/toast/ToastManager";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const addToast = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
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
      const response = await fetchRegister(data);
      addToast(response.data.message, "success");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (e) {
      if (typeof e.response.data.message !== "string") {
        Object.values(e.response.data.message).map((val) => {
          addToast(val, "danger");
        });
      } else {
        addToast(e.response.data.message, "danger");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black to-slate-800 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-3xl font-bold text-white dark:text-white text-center">
          Daftarkan akun ShowRoom Classic
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-10">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">Daftarkan akun Anda</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Masukkan nama anda.."
                  required
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
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
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  No. Telp
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Masukkan nomor telepon"
                  required
                  value={data.phone}
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
                {isLoading ? "Menunggu..." : "Daftar"}
              </button>
              <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                Sudah punya akun?{" "}
                <Link to={"/login"} className="font-medium text-gray-600 hover:underline dark:text-gray-500">
                  Masuk disini
                </Link>
              </p>
            </form>
            <Link to="/" className="">
              <p className="mt-4 hover:underline">&#x2B60; {"Kembali ke home"}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
