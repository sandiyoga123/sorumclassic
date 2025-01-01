import { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "../../../templates/toast/ToastManager";
import { fetchEditUnit, fetchGetUnitById } from "../../../API/unit";
import convertToFormData from "../../../helpers/formdata";

const EditUnit = ({ user, token }) => {
  const { id } = useParams();
  const addToast = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    year: "",
    type: "",
    document: "",
    price: "",
    stock: "",
    look: "",
    image: null,
    description: "",
  });
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetchGetUnitById(id, token);
        const unit = response.data.data;

        setFormData({
          name: unit.name,
          brand: unit.brand,
          year: unit.year,
          type: unit.type,
          document: unit.document,
          price: unit.price,
          stock: unit.stock,
          look: unit.look,
          description: unit.description,
          image: null, // We don't set the image file here
        });
        setCurrentImage(unit.image); // Store the current image URL
      } catch (e) {
        addToast(e.response.data.message, "danger");
        navigate("/admin/unit");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id, token, addToast, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const body = convertToFormData(formData);
      if (!formData.image) {
        // If no new image is selected, don't include the image field
        body.delete("image");
      }
      const response = await fetchEditUnit(id, body, token);

      addToast(response.data.message, "success");
      navigate(`/admin/unit/${id}`);
    } catch (e) {
      if (typeof e.response.data.message !== "string") {
        Object.values(e.response.data.message).map((val) => {
          addToast(val, "danger");
        });
      } else {
        addToast(e.response.data.message, "danger");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white shadow-xl rounded-lg">
      {isLoading ? (
        <h1>Memuat....</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Image Upload */}
            <div className="w-full md:w-1/3">
              <Label className="mb-2 block">Upload Foto</Label>
              <div className="space-y-4">
                <div className="w-full aspect-square bg-gray-100 rounded-lg">
                  {/* Show either the new selected image or the current image */}
                  {formData.image ? (
                    <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    currentImage && <img src={currentImage} alt="Current" className="w-full h-full object-cover rounded-lg" />
                  )}
                </div>
                <input type="file" accept="image/*" name="image" onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100" />
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nama Motor & Merek */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Motor</Label>
                  <TextInput id="name" name="name" value={formData.name} onChange={handleChange} className="w-full" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Merek</Label>
                  <TextInput id="brand" name="brand" value={formData.brand} onChange={handleChange} className="w-full" required />
                </div>

                {/* Tahun & Jenis */}
                <div className="space-y-2">
                  <Label htmlFor="year">Tahun</Label>
                  <TextInput id="year" name="year" type="number" value={formData.year} onChange={handleChange} className="w-full" required min={1900} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Jenis</Label>
                  <TextInput id="type" name="type" value={formData.type} onChange={handleChange} className="w-full" required />
                </div>

                {/* Surat & Harga */}
                <div className="space-y-2">
                  <Label htmlFor="document">Surat</Label>
                  <TextInput id="document" name="document" value={formData.document} onChange={handleChange} className="w-full" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Harga</Label>
                  <TextInput id="price" name="price" type="number" value={formData.price} onChange={handleChange} className="w-full" required min={0} />
                </div>

                {/* Look */}
                <div className="space-y-2">
                  <Label htmlFor="look">Look</Label>
                  <TextInput id="look" name="look" value={formData.look} onChange={handleChange} className="w-full" required />
                </div>

                {/* Stok */}
                <div className="space-y-2">
                  <Label htmlFor="stock">Stok</Label>
                  <TextInput id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} className="w-full" required min={0} />
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <ReactQuill theme="snow" value={formData.description} onChange={handleDescriptionChange} className="w-full rounded-lg resize-none h-full" required />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-x-2 gap-y-2 sm:gap-y-0">
            <button type="submit" className="px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-500 text-nowrap" disabled={isSaving}>
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <Link to={`/admin/unit/${id}`} className={`px-6 py-2 rounded outline outline-1 outline-slate-300 hover:bg-slate-50 text-nowrap text-center ${isSaving ? "pointer-events-none" : ""}`}>
              Kembali
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUnit;
