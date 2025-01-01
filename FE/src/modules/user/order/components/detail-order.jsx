import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import Cards from "./cards";
import formatToRupiah from "../../../../helpers/rupiah";
import { formatDateIndonesia } from "../../../../helpers/date";

function DetailOrderModal({ order, setStatus }) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 text-nowrap">
        Lihat Detail
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
        <Modal.Header>Detail Pesanan</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Order Details Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tanggal Pemesanan</label>
                <input type="text" disabled value={formatDateIndonesia(order.order_date, true)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Total Harga</label>
                <input type="text" disabled value={formatToRupiah(order.total_price)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Merk Kendaraan</label>
                <input type="text" disabled value={order.item.unit.brand} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nama Kendaraan</label>
                <input type="text" disabled value={order.item.unit.name} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
              </div>
            </div>

            {/* Shipping Details Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Alamat</label>
                <textarea disabled value={order.order_detail.address} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 resize-none" rows={3} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Kode Pos</label>
                <input type="text" disabled value={order.order_detail.postal_code} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ekspedisi</label>
                <input type="text" disabled value={order.order_detail.expedition} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Biaya Pengiriman</label>
                <input type="text" disabled value={formatToRupiah(order.order_detail.expedition_fee)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" />
              </div>
            </div>

            {/* Documents Section */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bukti Pembayaran</label>
                {order.payment_proof && (
                  <div>
                    <a href={order.payment_proof} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Lihat Bukti Pembayaran
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nomor Resi</label>
                {order.receipt ? (
                  <div>
                    <a href={order.receipt} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Lihat Resi
                    </a>
                  </div>
                ) : (
                  <div>
                    <p rel="noopener noreferrer" className="">
                      Bukti Resi belum disertakan
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)} disabled={isLoading}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DetailOrderModal;
