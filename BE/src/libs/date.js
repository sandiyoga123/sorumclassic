exports.formatToIndonesianDate = (date) => {
  // Example: Existing UTC date (from Prisma or another source)
  const utcDate = new Date(date); // Replace with your date

  // Format to ISO string
  return utcDate.toISOString().replace("Z", "+07:00");
};

exports.dateDaysAgo = (days_ago) => {
  const daysAgo = new Date();

  daysAgo.setDate(daysAgo.getDate() - days_ago);

  return daysAgo.toISOString().replace("Z", "+07:00");
};
