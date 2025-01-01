import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "./components/cards";
import { useToast } from "../../../templates/toast/ToastManager";
import { fetchGetOrdersUserByStatus } from "../../../API/order";
import OrderAlert from "./components/alert";

const UserOrder = ({ user, token }) => {
  const addToast = useToast();

  const [status, setStatus] = useState("Pembayaran");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchGetOrdersUserByStatus(status, token);

        setData(response.data.data);
      } catch (e) {
        addToast(e.response.data.message, "danger");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [status]);

  return (
    <div className="p-6 min-h-screen flex md:justify-center">
      <div className="w-full md:w-[80%]">
        <h1 className="text-2xl font-semibold text-center mb-4">Pesanan status</h1>

        <OrderAlert status={status} />

        <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 md:justify-center overflow-x-auto">
          <li className="me-2">
            <span
              onClick={() => {
                if (status != "Pembayaran") {
                  setStatus("Pembayaran");
                }
              }}
              className={`inline-block p-4 cursor-pointer rounded-t-lg ${status === "Pembayaran" ? "text-gray-600 bg-gray-100" : "hover:text-gray-600 hover:bg-gray-50"}`}
            >
              Pembayaran
            </span>
          </li>
          <li className="me-2">
            <span
              onClick={() => {
                if (status != "Dikemas") {
                  setStatus("Dikemas");
                }
              }}
              className={`inline-block p-4 cursor-pointer rounded-t-lg ${status === "Dikemas" ? "text-gray-600 bg-gray-100" : "hover:text-gray-600 hover:bg-gray-50"} dark:hover:bg-gray-800 dark:hover:text-gray-300`}
            >
              Dikemas
            </span>
          </li>
          <li className="me-2">
            <span
              onClick={() => {
                if (status != "Dikirim") {
                  setStatus("Dikirim");
                }
              }}
              className={`inline-block p-4 cursor-pointer rounded-t-lg ${status === "Dikirim" ? "text-gray-600 bg-gray-100" : "hover:text-gray-600 hover:bg-gray-50"} dark:hover:bg-gray-800 dark:hover:text-gray-300`}
            >
              Dikirim
            </span>
          </li>
          <li className="me-2">
            <span
              onClick={() => {
                if (status != "Review") {
                  setStatus("Review");
                }
              }}
              className={`inline-block p-4 cursor-pointer rounded-t-lg ${status === "Review" ? "text-gray-600 bg-gray-100" : "hover:text-gray-600 hover:bg-gray-50"} dark:hover:bg-gray-800 dark:hover:text-gray-300`}
            >
              Review
            </span>
          </li>
          <li className="me-2">
            <span
              onClick={() => {
                if (status != "Riwayat") {
                  setStatus("Riwayat");
                }
              }}
              className={`inline-block p-4 cursor-pointer rounded-t-lg ${status === "Riwayat" ? "text-gray-600 bg-gray-100" : "hover:text-gray-600 hover:bg-gray-50"} dark:hover:bg-gray-800 dark:hover:text-gray-300`}
            >
              Riwayat
            </span>
          </li>
          <li className="me-2">
            <span
              onClick={() => {
                if (status != "Ditolak") {
                  setStatus("Ditolak");
                }
              }}
              className={`inline-block p-4 cursor-pointer rounded-t-lg ${status === "Ditolak" ? "text-gray-600 bg-gray-100" : "hover:text-gray-600 hover:bg-gray-50"} dark:hover:bg-gray-800 dark:hover:text-gray-300`}
            >
              Ditolak
            </span>
          </li>
        </ul>
        <Cards status={status} isLoading={isLoading} data={data} setStatus={setStatus} />
      </div>
    </div>
  );
};

export default UserOrder;
