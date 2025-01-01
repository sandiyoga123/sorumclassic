import { Button, FileInput, Label, Modal } from "flowbite-react";
import { useState } from "react";
import { useToast } from "../../../../../templates/toast/ToastManager";
import { fetchUpdateOrderStatus } from "../../../../../API/order";

function UpdateStatusModal({ order_id, status, setShouldRefetch }) {
  const addToast = useToast();

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusNew, setStatusNew] = useState(status);
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Basic validation
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        addToast("File harus berupa gambar", "danger");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("status", statusNew);
      formData.append("image", file);

      const response = await fetchUpdateOrderStatus(order_id, formData, token);
      addToast(response.data.message, "success");
      setShouldRefetch(true);
      setOpenModal(false);
    } catch (e) {
      addToast(e.response.data.message, "danger");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setStatusNew("");
    setOpenModal(false);
  };

  const updateAbleStatus = ["Dikemas", "Dikirim"];
  const statusText = {
    Pembayaran: "Pembeli perlu mengupload bukti pembayaran terlebih dahulu.",
    Review: "Pembeli perlu memberi review terlebih dahulu.",
    Riwayat: "Pesanan telah diselesaikan.",
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)} className={`px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-500 text-nowrap text-center`}>
        Update Status Pesanan
      </button>
      <Modal
        show={openModal}
        onClose={() => {
          if (!isLoading) {
            handleClose();
          }
        }}
      >
        <Modal.Header>Ubah Status Pesanan</Modal.Header>
        <Modal.Body>
          {status && !updateAbleStatus.includes(status) && (
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span class="font-medium">Tidak dapat mengubah status.</span> {statusText[status]}
            </div>
          )}
          <div className="space-y-6">
            <div className="flex-1 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={statusNew || ""} onChange={(e) => setStatusNew(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Pilih Status</option>
                <option value="Dikirim">Dikirim</option>
                <option value="Review">Review</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </div>
          </div>
          {statusNew && statusNew == "Dikirim" && (
            <>
              <div className="mt-4">
                <Label htmlFor="file-upload-helper-text" value="Upload Nomor Resi" />
              </div>
              <FileInput id="file-upload-helper-text" helperText="File harus berupa gambar" accept="image/*" onChange={handleFileChange} />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} color="dark" disabled={!status || isLoading || (status && !updateAbleStatus.includes(status))}>
            {isLoading ? "Mohon tunggu" : "Ubah Status"}
          </Button>
          <Button color="gray" onClick={handleClose}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateStatusModal;
