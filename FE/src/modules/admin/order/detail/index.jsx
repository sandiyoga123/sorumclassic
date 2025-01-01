import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "../../../../templates/toast/ToastManager";
import { fetchGetOrderDetail } from "../../../../API/order";
import OrderDetailView from "./components/view";
import UpdateStatusModal from "./components/update-status";

const OrderDetailAdmin = ({ user, token }) => {
  const { order_id } = useParams();

  const addToast = useToast();

  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchGetOrderDetail(order_id, token);

        console.log(response);
        setData(response.data.data);
      } catch (e) {
        addToast(e.response.data.message, "danger");
      } finally {
        setIsLoading(false);
        setShouldRefetch(false);
      }
    };

    if (shouldRefetch) fetch();
  }, [shouldRefetch]);
  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="font-normal text-xl">Detail Pesanan</h1>
      <div className="mt-6 flex flex-col sm:flex-row justify-end gap-x-2 gap-y-2 sm:gap-y-0">
        {data && <UpdateStatusModal status={data.status} order_id={data.id} setShouldRefetch={setShouldRefetch} />}
        <Link to={"/admin/order"} className={`px-6 py-2 rounded  outline outline-1 outline-slate-300 hover:bg-slate-50 text-nowrap text-center ${isLoading ? "pointer-events-none" : ""}`}>
          Kembali
        </Link>
      </div>
      {/* CODE HERE */}
      {data && <OrderDetailView data={data} />}
    </div>
  );
};

export default OrderDetailAdmin;
