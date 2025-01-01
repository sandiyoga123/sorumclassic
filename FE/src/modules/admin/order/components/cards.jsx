import { Link } from "react-router-dom";
import ImageLoader from "../../../../helpers/image-loader";
import formatToRupiah from "../../../../helpers/rupiah";
import NoDataTable from "../../../user/order/components/no-order";
import { formatDateIndonesia } from "../../../../helpers/date";
const Cards = ({ isLoading, data }) => {
  return (
    <div className="relative overflow-x-auto my-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Produk
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap text-center">
              Pemesan
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap text-center">
              Total Harga
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap text-center">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap text-center">
              Tanggal Pesan
            </th>
            <th scope="col" className={`px-6 py-3 text-nowrap text-center`}>
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
                      <ImageLoader src={order.item.unit.image} className={"h-10 sm:h-20 object-cover"} alt={"Gambar unit"} />
                      <p>{order.item.unit.name}</p>
                    </th>
                    <td className="px-6 py-4 text-center">{order.order_detail.name}</td>
                    <td className="px-6 py-4 text-center">{formatToRupiah(order.total_price)}</td>
                    <td className="px-6 py-4 text-center">{order.status}</td>
                    <td className="px-6 py-4 text-center">{formatDateIndonesia(order.order_date, true)}</td>
                    <td className="px-6 py-4 text-center">
                      <Link to={`/admin/order/${order.id}`} className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 text-nowrap">
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <NoDataTable colSpan={6} message={"Tidak ada pesanan yang memenuhi"} />
            )
          ) : (
            <NoDataTable colSpan={6} message={"Data gagal didapatkan"} />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cards;
