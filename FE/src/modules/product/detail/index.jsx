import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../templates/toast/ToastManager";
import { fetchGetUnitById } from "../../../API/unit";
import ImageLoader from "../../../helpers/image-loader";
import formatToRupiah from "../../../helpers/rupiah";

const DetailProduct = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const addToast = useToast();

  const [unit, setUnit] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchGetUnitById(id, null);

        setUnit(response.data.data);
      } catch (e) {
        addToast(e.response.data.message, "danger");
        navigate("/product");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  const handleUserLogin = () => {
    if (!user) {
      localStorage.setItem("nextPage", `/checkout/${id}`);
      navigate("/login");
    } else {
      navigate(`/checkout/${id}`);
    }
  };

  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="text-center font-medium text-3xl mb-4">Detail Produk</h1>

      {isLoading ? (
        <h1 className="text-center font-medium text-3xl mb-4">Memuat produk...</h1>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <ImageLoader className={`max-h-96 object-cover mx-auto rounded-xl shadow-lg`} src={unit.image} />
            <div className="w-full flex flex-col items-center gap-y-2">
              <h1 className="font-semibold text-3xl">{unit.name}</h1>
              <p className="font-normal text-2xl">{formatToRupiah(unit.price || 0)},-</p>
              <div className="w-full flex flex-col items-stretch ">
                <p className="font-normal text-2xl w-full">Merek : {unit.brand}</p>
                <p className="font-normal text-2xl w-full">Tahun : {unit.year}</p>
                <p className="font-normal text-2xl w-full">Look : {unit.look}</p>
                <p className="font-normal text-2xl w-full">Jenis : {unit.type}</p>
                <p className="font-normal text-2xl w-full">Surat : {unit.document}</p>
                <p className="font-normal text-2xl w-full">Jumlah Unit : {unit.stock}</p>
              </div>
              <button onClick={handleUserLogin} className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded text-xl">
                Pesan Sekarang
              </button>
              <a href="https://wa.me/+6281299063740" target="_blank" className="flex flex-row justify-center items-center px-4 py-2 outline outline-1 outline-gray-900 text-black group hover:text-white hover:bg-gray-900 rounded text-xl">
                <svg width="30" height="30" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="bg-black group-hover:bg-inherit">
                  <path
                    d="M36.5125 9.41061C34.755 7.63598 32.662 6.22888 30.3552 5.27131C28.0485 4.31373 25.5742 3.82484 23.0767 3.83311C12.6117 3.83311 4.0825 12.3623 4.0825 22.8273C4.0825 26.1814 4.96417 29.4398 6.6125 32.3148L3.92917 42.1664L13.9917 39.5214C16.7708 41.0356 19.895 41.8406 23.0767 41.8406C33.5417 41.8406 42.0708 33.3114 42.0708 22.8464C42.0708 17.7673 40.0967 12.9948 36.5125 9.41061ZM23.0767 38.6206C20.24 38.6206 17.4608 37.8539 15.0267 36.4164L14.4517 36.0714L8.47167 37.6431L10.0625 31.8164L9.67917 31.2223C8.1028 28.7058 7.26594 25.7967 7.26417 22.8273C7.26417 14.1256 14.3558 7.03394 23.0575 7.03394C27.2742 7.03394 31.2417 8.68228 34.2125 11.6723C35.6838 13.1363 36.8497 14.878 37.6426 16.7962C38.4356 18.7143 38.8397 20.7709 38.8317 22.8464C38.87 31.5481 31.7783 38.6206 23.0767 38.6206ZM31.74 26.8139C31.2608 26.5839 28.9225 25.4339 28.5008 25.2614C28.06 25.1081 27.7533 25.0314 27.4275 25.4914C27.1017 25.9706 26.2008 27.0439 25.9325 27.3506C25.6642 27.6764 25.3767 27.7148 24.8975 27.4656C24.4183 27.2356 22.885 26.7181 21.0833 25.1081C19.665 23.8431 18.7258 22.2906 18.4383 21.8114C18.17 21.3323 18.4 21.0831 18.6492 20.8339C18.86 20.6231 19.1283 20.2781 19.3583 20.0098C19.5883 19.7414 19.6842 19.5306 19.8375 19.2239C19.9908 18.8981 19.9142 18.6298 19.7992 18.3998C19.6842 18.1698 18.7258 15.8314 18.3425 14.8731C17.9592 13.9531 17.5567 14.0681 17.2692 14.0489H16.3492C16.0233 14.0489 15.525 14.1639 15.0842 14.6431C14.6625 15.1223 13.4358 16.2723 13.4358 18.6106C13.4358 20.9489 15.1417 23.2106 15.3717 23.5173C15.6017 23.8431 18.7258 28.6348 23.4792 30.6856C24.61 31.1839 25.4917 31.4714 26.1817 31.6823C27.3125 32.0464 28.3475 31.9889 29.1717 31.8739C30.0917 31.7398 31.9892 30.7239 32.3725 29.6123C32.775 28.5006 32.775 27.5614 32.6408 27.3506C32.5067 27.1398 32.2192 27.0439 31.74 26.8139Z"
                    fill="#D8D2C2"
                  />
                </svg>
                Hubungi Admin
              </a>
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-center font-medium text-3xl mt-10 mb-4">Deskripsi</h1>
            <div className="p-2 w-full md:w-[60%] outline outline-1 outline-slate-300 rounded-lg min-h-[150px] whitespace-pre-wrap">
              <div className="w-full" dangerouslySetInnerHTML={{ __html: unit.description }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailProduct;
