import { useState, useEffect } from "react";
import { fetchGetUnitById } from "../../../API/unit";
import ImageLoader from "../../../helpers/image-loader";
import formatToRupiah from "../../../helpers/rupiah";
import { Dropdown } from "flowbite";
import { useParams, useNavigate } from "react-router-dom";
import { Label, TextInput, Select, Textarea } from "flowbite-react";
import { useToast } from "../../../templates/toast/ToastManager";
import { expeditionData } from "../../../helpers/expedition";
import { fetchProfile } from "../../../API/auth";
import { fetchCreateOrder } from "../../../API/order";

const CheckoutProduct = ({ user }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const addToast = useToast();

  const token = localStorage.getItem("token");

  const [unit, setUnit] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    postal_code: "",
    expedition: "",
    additional_info: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchGetUnitById(id, null);
        const profile = await fetchProfile(token);
        const dataUnit = response.data.data;
        setUnit(dataUnit);
        setTotalPrice(dataUnit.price);
        setFormData({
          name: profile?.data?.data?.name || "",
          phone: profile?.data?.data?.phone || "",
          address: "",
          postal_code: "",
          expedition: "",
          additional_info: "",
        });
      } catch (e) {
        addToast(e.response.data.message, "danger");
        navigate("/product");
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      localStorage.setItem("nextPage", `/checkout/${id}`);
      navigate("/login");
    } else {
      fetch();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "expedition") {
      setTotalPrice(unit.price + expeditionData[value]);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchCreateOrder(id, formData, token);

      addToast(response.data.message, "success");
      navigate("/order");
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
    <div className="p-6 flex justify-center">
      <div className="w-[80%]">
        <h1 className="font-semibold text-3xl">Detail Pembayaran</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            {/* Right Side */}
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <TextInput id="name" name="name" value={formData.name} onChange={handleChange} className="w-full" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <TextInput id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <TextInput id="address" name="address" value={formData.address} onChange={handleChange} className="w-full" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal_code">Kode Pos</Label>
              <TextInput id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleChange} className="w-full" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expedition">Ekspedisi</Label>
              <Select id="expedition" name="expedition" value={formData.expedition} onChange={handleChange} className="w-full" required>
                <option value="">Pilih ekspedisi</option>
                <option value="JNE">JNE</option>
                <option value="JNT">JNT</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additional_info">Informasi Tambahan</Label>
              <Textarea id="additional_info" name="additional_info" value={formData.additional_info} onChange={handleChange} className="w-full min-h-40" />
            </div>
          </div>
          <div className="border border-slate-900 rounded-lg flex flex-col">
            {/* Left Side */}
            <h1 className="border-b border-slate-900 py-2 text-center font-semibold text-xl">Total Pesanan</h1>
            {isLoading ? (
              <h1 className="border-b border-slate-900 py-2 text-center font-semibold text-xl">Memuat data...</h1>
            ) : (
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 border-b border-slate-900 p-4">
                <ImageLoader src={unit.image} className={`w-32 object-cover rounded-xl shadow-lg`} />
                <div className="flex flex-col items-center md:items-stretch md:justify-evenly">
                  <p className="font-semibold text-lg">{unit.name}</p>
                  <p className="font-semibold text-lg">{formatToRupiah(unit.price || 0)}</p>
                </div>
              </div>
            )}
            <div className="flex justify-center p-4 gap-y-4 border-b border-slate-900">
              <p className="text-center font-semibold text-xl">Biaya Pengiriman : {formatToRupiah(expeditionData[formData.expedition] || 0)},-</p>
            </div>
            <div className="flex flex-col justify-end h-full p-4 gap-y-4">
              <p className="text-center font-semibold text-xl">Total Pesanan : {formatToRupiah(totalPrice || 0)}</p>
              <button type="submit" className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800" disabled={isLoading}>
                {isLoading ? "Mohon tunggu.." : "Buat Pesanan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutProduct;
