import { Link } from "react-router-dom";
import ImageLoader from "../../../../helpers/image-loader";
import formatToRupiah from "../../../../helpers/rupiah";
import hayabusa from "/src/assets/hayabusa.avif";
import NoDataTable from "./no-order";
import PaymentModal from "./payment-modal";
import DetailOrderModal from "./detail-order";
import RatingModal from "./rating-modal";
const Cards = ({ status, isLoading, data, setStatus }) => {
  const statusText = {
    Pembayaran: "Bayar Produk",
    Dikemas: "Lihat Detail",
    Dikirim: "Lihat Detail",
    Review: "Berikan Review",
    Riwayat: "Lihat Detail",
    Ditolak: "Lihat Detail",
  };

  return (
    <div className="relative overflow-x-auto my-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Produk
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap text-center">
              Pengiriman
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap text-center">
              Total Harga
            </th>
            <th scope="col" className={`px-6 py-3 text-nowrap text-center ${data instanceof Array ? "" : "hidden"}`}>
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <NoDataTable colSpan={4} message={"Memuat data..."} />
          ) : data instanceof Array ? (
            data.length != 0 ? (
              data.map((order) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-50">
                    <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col justify-center items-center min-w-20 sm:min-w-40">
                      <ImageLoader src={order.item.unit.image} className={"h-20 sm:h-40 object-cover"} alt={"Gambar unit"} />
                      <p>{order.item.unit.name}</p>
                    </th>
                    <td className="px-6 py-4 text-center">{formatToRupiah(order.order_detail.expedition_fee)}</td>
                    <td className="px-6 py-4 text-center">{formatToRupiah(order.total_price)}</td>
                    <td className="px-6 py-4 text-center">
                      {status == "Pembayaran" ? <PaymentModal order={order} setStatus={setStatus} /> : status == "Review" ? <RatingModal order={order} setStatus={setStatus} /> : <DetailOrderModal order={order} setStatus={setStatus} />}
                    </td>
                  </tr>
                );
              })
            ) : (
              <NoDataTable colSpan={4} message={"Tidak ada pesanan dalam status ini"} />
            )
          ) : (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-50">
              <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-col justify-center items-center min-w-20 sm:min-w-40">
                <ImageLoader src={data.item.unit.image} className={"h-20 sm:h-40 object-cover"} alt={"Gambar unit"} />
                <p>{data.item.unit.name}</p>
              </th>
              <td className="px-6 py-4 text-center">{formatToRupiah(data.order_detail.expedition_fee)}</td>
              <td className="px-6 py-4 text-center">{formatToRupiah(data.total_price)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cards;
