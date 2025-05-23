import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../../common";
import Cart from "../../Components/Cart";


const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      const responseData = await response.json();

      setData(responseData.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading....</p>}
      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center">No data found</p>
      )}
      {data.length !== 0 && !loading && (
        <Cart loading={loading} data={data}></Cart>
      )}
    </div>
  );
};

export default SearchProduct;
