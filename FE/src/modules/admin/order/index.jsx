import { useEffect, useState } from "react";
import { useToast } from "../../../templates/toast/ToastManager";
import { useNavigate } from "react-router-dom";
import { fetchGetAllOrder } from "../../../API/order";
import Pagination from "../../../templates/pagination";
import Cards from "./components/Cards";
import FilterSection from "./components/filter";

const OrderAdmin = ({ user, token }) => {
  const navigate = useNavigate();
  const addToast = useToast();

  const [filter, setFilter] = useState({
    page: 1,
    status: "",
    lte: null,
    gte: null,
    total_items: null,
    total_pages: 1,
  });
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchGetAllOrder(filter, token);
        const { items, page, total_items, total_pages } = response.data.data;
        console.log(response.data.data);

        setOrders(items);
        setFilter({
          page: page,
          total_items,
          total_pages,
          ...filter,
        });
      } catch (e) {
        addToast(e.response.data.message, "danger");
        navigate("/admin");
      } finally {
        setIsLoading(false);
        setShouldRefetch(false);
      }
    };

    if (shouldRefetch) fetch();
  }, [shouldRefetch]);

  const onPageChange = (page) => {
    setFilter((val) => ({
      ...val,
      page: page,
    }));
    setShouldRefetch(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="font-normal text-xl">List Pesanan</h1>
      <FilterSection filter={filter} setFilter={setFilter} setShouldRefetch={setShouldRefetch} isLoading={isLoading} />
      <Cards isLoading={isLoading} data={orders} />
      <Pagination currentPage={filter.page} totalPages={filter.total_pages} onPageChange={onPageChange} />
    </div>
  );
};

export default OrderAdmin;
