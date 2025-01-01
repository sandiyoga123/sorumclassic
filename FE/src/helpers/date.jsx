/**
 * Format a date into Indonesian date format (DD/MM/YYYY or other styles)
 *
 * @param {string|Date} dateInput - The date input (string or Date object)
 * @param {boolean} includeTime - Whether to include time in the format
 * @returns {string} Formatted date in Indonesian format
 */
export function formatDateIndonesia(dateInput, includeTime = false) {
  // Ensure the input is a valid Date object
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  // Array of month names in Indonesian
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  // Extract day, month, and year
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format time if includeTime is true
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  // Return the formatted date string
  return includeTime ? `${day} ${month} ${year}, ${time}` : `${day} ${month} ${year}`;
}

export function formatToIDRVerbal(amount) {
  if (typeof amount !== "number" || amount < 0) {
    throw new Error("Input must be a positive number");
  }

  // Define the units for IDR
  const units = ["", "Ribu", "Juta", "Miliar", "Triliun"];

  let unitIndex = 0;
  let formattedAmount = amount;

  // Reduce the amount to a readable range with a corresponding unit
  while (formattedAmount >= 1000 && unitIndex < units.length - 1) {
    formattedAmount /= 1000;
    unitIndex++;
  }

  // Format to 2 decimal places if necessary and add commas
  const result = `${formattedAmount.toLocaleString("id-ID", { maximumFractionDigits: 2 })} ${units[unitIndex]}`;

  return result.trim();
}
