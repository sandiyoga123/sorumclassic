const dataStatus = ["Pembayaran", "Dikemas", "Dikirim", "Review", "Riwayat", "Ditolak"];

exports.statusLevel = (status) => {
  return dataStatus.findIndex((val) => val === status);
};
