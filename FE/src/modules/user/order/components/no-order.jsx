const NoDataTable = ({ colSpan, message }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-50">
      <td className="px-6 py-4 text-center" colSpan={colSpan}>
        {message}
      </td>
    </tr>
  );
};

export default NoDataTable;
