import { useState } from "react";

const FilterSection = ({ filter, setFilter, setShouldRefetch, isLoading }) => {
  const [localFilter, setLocalFilter] = useState(filter);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilter((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
  };

  const handleSearch = () => {
    setFilter((prev) => ({
      ...prev,
      ...localFilter,
      page: 1, // Reset page when applying new filters
    }));
    setShouldRefetch(true);
  };

  return (
    <div className="my-4 space-y-4">
      <div className="md:flex md:items-end md:space-x-4">
        <div className="flex-1 mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" value={localFilter.status || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Semua Status</option>
            <option value="Pembayaran">Pembayaran</option>
            <option value="Dikemas">Dikemas</option>
            <option value="Dikirim">Dikirim</option>
            <option value="Review">Review</option>
            <option value="Riwayat">Riwayat</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

        <div className="flex-1 mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input type="date" name="gte" value={localFilter.gte || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex-1 mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input type="date" name="lte" value={localFilter.lte || ""} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="md:flex-none">
          <button onClick={handleSearch} className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" disabled={isLoading}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
