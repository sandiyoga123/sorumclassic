import React, { useEffect, useState } from "react";
import { CircleDollarSign, Package, ShoppingCart, CheckCircle } from "lucide-react";
import { useToast } from "../../templates/toast/ToastManager";
import { fetchGetDashboardData } from "../../API/order";
import { formatToIDRVerbal } from "../../helpers/date";

const Dashboard = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [day, setDay] = useState();
  const addToast = useToast();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchGetDashboardData(day, token);
        const dataResult = response.data.data;
        setData(dataResult);
      } catch (e) {
        addToast(e.response.data.message, "danger");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [day]);

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {isLoading && <div className="flex justify-center items-center">Loading...</div>}
      <div className="w-full flex flex-col justify-center mb-4 items-end gap-x-2">
        <span className="font-semibold">Jangka Waktu:</span>
        <div className="flex gap-x-0">
          <button className={`border border-slate-200 rounded px-2 py-2 hover:bg-slate-300 ${day == null ? "bg-slate-300" : ""}`} onClick={() => setDay(null)} disabled={isLoading}>
            All
          </button>
          <button className={`border border-slate-200 rounded px-2 py-2 hover:bg-slate-300 ${day == 1 ? "bg-slate-300" : ""}`} onClick={() => setDay(1)} disabled={isLoading}>
            1d
          </button>
          <button className={`border border-slate-200 rounded px-2 py-2 hover:bg-slate-300 ${day == 7 ? "bg-slate-300" : ""}`} onClick={() => setDay(7)} disabled={isLoading}>
            7d
          </button>
          <button className={`border border-slate-200 rounded px-2 py-2 hover:bg-slate-300 ${day == 30 ? "bg-slate-300" : ""}`} onClick={() => setDay(30)} disabled={isLoading}>
            30d
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data && (
          <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <div className="flex flex-row items-center justify-between pb-2">
                <h1 className="text-xl font-medium">Total Pesanan</h1>
                <ShoppingCart className="h-10 w-10 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{data.totalOrder}</div>
                <p className="text-sm text-gray-500">Semua pesanan diterima</p>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <div className="flex flex-row items-center justify-between pb-2">
                <h1 className="text-xl font-medium">Pesanan Diselesaikan</h1>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{data.completedOrder}</div>
                <p className="text-sm text-gray-500">Pesanan telah diterima pelanggan</p>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <div className="flex flex-row items-center justify-between pb-2">
                <h1 className="text-xl font-medium">Total Pendapatan</h1>
                <CircleDollarSign className="h-10 w-10 text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {/* {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(data.totalCompletedPayment)} */}
                  {formatToIDRVerbal(data.totalCompletedPayment)}~
                </div>
                <p className="text-sm text-gray-500">Pendapatan pesanan yang telah selesai</p>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
              <div className="flex flex-row items-center justify-between pb-2">
                <h1 className="text-xl font-medium">Unit Terjual</h1>
                <Package className="h-10 w-10 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{data.soldUnit}</div>
                <p className="text-sm text-gray-500">Total unit yang terjual</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
