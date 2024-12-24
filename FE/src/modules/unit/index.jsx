import { useEffect, useState } from "react";
import Pagination from "../../templates/pagination";
import { useToast } from "../../templates/toast/ToastManager";
import { fetchAllUndeletedUnit } from "../../API/unit";
import { Link } from "react-router-dom";
import ImageLoader from "../../helpers/image-loader";

const Unit = () => {
  const addToast = useToast();

  const [units, setUnits] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchAllUndeletedUnit();

        console.log(response.data);
        setUnits(response.data.data);
      } catch (e) {
        addToast(e.response.data.message, "danger");
      }
    };
    fetch();
  }, []);

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="w-full flex flex-row justify-between items-baseline md:items-center">
        <h1 className="font-normal text-xl">List Unit</h1>
        <button className="px-4 py-2 rounded text-white bg-black hover:bg-gray-700">Tambah Unit</button>
      </div>

      <div class="relative overflow-x-auto my-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3"></th>
              <th scope="col" class="px-6 py-3 text-nowrap text-center">
                Nama Unit
              </th>
              <th scope="col" class="px-6 py-3 text-nowrap text-center hidden sm:table-cell">
                Surat
              </th>
              <th scope="col" class="px-6 py-3 text-nowrap text-center hidden sm:table-cell">
                Price
              </th>
              <th scope="col" class="px-6 py-3 text-nowrap text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {units ? (
              units.map((item) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-50">
                    <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-center items-center min-w-20 sm:min-w-40">
                      <ImageLoader src={item.image} className={"h-20 sm:h-40 object-cover"} alt={"Gambar unit"} />
                    </th>
                    <td class="px-6 py-4 text-center">Silver</td>
                    <td class="px-6 py-4 text-center hidden sm:table-cell">Laptop</td>
                    <td class="px-6 py-4 text-center hidden sm:table-cell">$2999</td>
                    <td class="text-center">
                      <Link to={`/admin/unit/${item.id}`} className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 text-nowrap">
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-50">
                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
                </th>
                <td className="">Silver</td>
                <td className="">Laptop</td>
                <td className="">$2999</td>
                <td className="">
                  <Link to="#" className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 text-nowrap">
                    Lihat Detail
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default Unit;
