import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import Cards from "./cards";
import { fetchUploadPayment } from "../../../../API/order";
import { useToast } from "../../../../templates/toast/ToastManager";

function PaymentModal({ order, setStatus }) {
  const addToast = useToast();

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Basic validation
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setError("File harus berupa gambar");
        setFile(null);
        return;
      }

      setError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Silakan pilih file terlebih dahulu");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetchUploadPayment(order.id, formData, token);

      addToast(response.data.message, "success");

      setStatus("Dikemas");

      // Reset form
      setFile(null);
      setOpenModal(false);
      setError("");
    } catch (e) {
      addToast(e.response.data.message, "danger");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 text-nowrap">
        Bayar Produk
      </button>
      <Modal
        show={openModal}
        onClose={() => {
          if (!isLoading) {
            setOpenModal(false);
          }
        }}
        size="5xl"
      >
        <Modal.Header>Upload Bukti Bayar</Modal.Header>
        <Modal.Body>
          {order && <Cards data={order} status={"Pembayaran"} isLoading={isLoading} />}
          <div className="space-y-4">
            <div>
              <Label htmlFor="file-upload-helper-text" value="Upload Bukti Pembayaran" />
            </div>
            <FileInput id="file-upload-helper-text" helperText="File harus berupa gambar" accept="image/*" onChange={handleFileChange} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {file && (
              <p className="text-green-600 text-sm mt-1">
                File terpilih: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} color="dark" disabled={isLoading || !file}>
            {isLoading ? "Mengunggah..." : "Bayar"}
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)} disabled={isLoading}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PaymentModal;
