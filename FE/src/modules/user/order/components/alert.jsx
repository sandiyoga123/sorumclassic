const OrderAlert = ({ status }) => {
  const statusText = {
    Pembayaran: "Mohon segera membayar produk yang dipesan sebelum pesanan ditolak oleh admin",
    Dikemas: "Pesanan anda sedang dikonfirmasi dan diproses oleh admin",
    Dikirim: "Pesanan anda sudah dikonfirmasi dan dikirim ke alamat anda, lihat bukti resi pada detail pesanan",
    Review: "Pesanan sudah sampai di alamat anda, mohon berikan review untuk feedback kami",
    Riwayat: "Berikut adalah riwayat pesanan anda",
    Ditolak: "Pesanan dibatalkan oleh admin dikarenakan pembayaran yang tidak valid atau kondisi yang tidak memungkinkan",
  };

  return (
    <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 text-center" role="alert">
      <span class="font-medium">{statusText[status]}</span> Jika ada pertanyaan lebih lanjut maka bisa hubungi admin dengan{" "}
      <a href="https://wa.me/+6283811921019" className="font-medium cursor-pointer" target="_blank">
        Klik disini
      </a>
    </div>
  );
};

export default OrderAlert;
