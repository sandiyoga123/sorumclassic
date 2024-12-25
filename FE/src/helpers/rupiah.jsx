/**
 * Formats an integer to Indonesian Rupiah currency format.
 * @param {number} amount - The integer amount to format.
 * @returns {string} - The formatted Rupiah currency string.
 */
function formatToRupiah(amount) {
  if (isNaN(amount)) {
    throw new Error("Input must be a valid number");
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default formatToRupiah;
