import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../templates/toast/ToastManager";
import { fetchDeleteUnit, fetchGetUnitById } from "../../../API/unit";
import { Label } from "flowbite-react";
import ConfirmationModal from "../../../templates/modal/delete";

const DetailUnit = ({ user, token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const addToast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [unit, setUnit] = useState();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchGetUnitById(id, token);

        setUnit(response.data.data);
      } catch (e) {
        addToast(e.response.data.message, "danger");
        navigate("/admin/unit");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetchDeleteUnit(id, token);

      addToast(response.data.message, "success");
      navigate("/admin/unit");
    } catch (e) {
      addToast("Gagal menghapus unit", "danger");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {isLoading && <h1>Memuat....</h1>}
        {!isLoading && unit && (
          <>
            {/* Left Column - Images */}
            <div className="w-full md:w-1/3">
              <div className="space-y-4 text-center">
                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {/* Main image */}
                  <img src={unit.image} alt={unit.name} className="w-full h-full object-cover" />
                </div>
                <Label className="mb-2 block">Foto Unit</Label>
              </div>
            </div>

            {/* Right Column - Unit Details */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nama Motor & Merek */}
                <div className="space-y-2">
                  <Label className="text-gray-600">Nama Motor</Label>
                  <div className="p-2 bg-gray-50 outline outline-1 outline-slate-300 rounded-lg">{unit.name}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-600">Merek</Label>
                  <div className="p-2 bg-gray-50 outline outline-1 outline-slate-300 rounded-lg">{unit.brand}</div>
                </div>

                {/* Tahun & Jenis */}
                <div className="space-y-2">
                  <Label className="text-gray-600">Tahun</Label>
                  <div className="p-2 bg-gray-50 outline outline-1 outline-slate-300 rounded-lg">{unit.year}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-600">Jenis</Label>
                  <div className="p-2 bg-gray-50 outline outline-1 outline-slate-300 rounded-lg">{unit.type}</div>
                </div>

                {/* Surat & Harga */}
                <div className="space-y-2">
                  <Label className="text-gray-600">Surat</Label>
                  <div className="p-2 bg-gray-50 outline outline-1 outline-slate-300 rounded-lg">{unit.document}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-600">Harga</Label>
                  <div className="p-2 bg-gray-50 outline outline-1 outline-slate-300 rounded-lg">Rp. {Number(unit.price).toLocaleString("id-ID")}</div>
                </div>

                {/* Look */}
                <div className="space-y-2">
                  <Label className="text-gray-600">Look</Label>
                  <div className="p-2 bg-gray-50 outline outline-1 outline-slate-300 rounded-lg">{unit.look}</div>
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <Label className="text-gray-600">Stok</Label>
                  <div className="p-2 bg-gray-50 outline outline-1 outline-slate-300 rounded-lg">{unit.stock}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 space-y-2">
                <Label className="text-gray-600">Deskripsi</Label>
                <div className="p-2 bg-gray-50 outline outline-1 outline-slate-300 rounded-lg min-h-[150px] whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: unit.description }} />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-end gap-x-2 gap-y-2 sm:gap-y-0">
        <Link to={`/admin/unit/edit/${id}`} className={`px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-500 text-nowrap text-center ${isLoading ? "pointer-events-none" : ""}`}>
          Edit Unit
        </Link>
        <button className="px-6 py-2 rounded text-white bg-red-600 hover:bg-red-500 text-nowrap" disabled={isLoading} onClick={() => setOpenModal(true)}>
          {isLoading ? "Menunggu.." : "Hapus Unit"}
        </button>
        <Link to={"/admin/unit"} className={`px-6 py-2 rounded  outline outline-1 outline-slate-300 hover:bg-slate-50 text-nowrap text-center ${isLoading ? "pointer-events-none" : ""}`}>
          Kembali
        </Link>
      </div>
      <ConfirmationModal show={openModal} onClose={() => setOpenModal(false)} onConfirm={handleDelete} isLoading={isLoading} />
    </div>
  );
};

export default DetailUnit;
