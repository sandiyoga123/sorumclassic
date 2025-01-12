import { useEffect, useState } from "react";
import CardProduct from "./component/card";
import { useToast } from "../../templates/toast/ToastManager";
import { fetchAllUndeletedUnit } from "../../API/unit";

const Product = () => {
  const addToast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllUndeletedUnit();

        setUnits(response.data.data);
      } catch (e) {
        addToast(e.response.data.message, "danger");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-center font-medium text-3xl mb-4">Produk Kami</h1>
      {isLoading ? (
        <h1 className="text-center font-medium text-3xl my-4">Memuat produk....</h1>
      ) : !isLoading && units && units.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 min-[1600px]:grid-cols-5 gap-4">
          {units.map((unit) => {
            return <CardProduct item={unit} />;
          })}
        </div>
      ) : units && units.length == 0 ? (
        <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 text-center" role="alert">
          <span class="font-medium">Maaf, belum ada produk tersedia untuk saat ini</span> Jika ada pertanyaan lebih lanjut maka bisa hubungi admin dengan{" "}
          <a href="https://wa.me/+6281299063740" className="font-medium cursor-pointer" target="_blank">
            Klik disini
          </a>
        </div>
      ) : (
        <h1 className="text-center font-medium text-3xl my-4">Gagal memuat produk....</h1>
      )}
    </div>
  );
};

export default Product;
