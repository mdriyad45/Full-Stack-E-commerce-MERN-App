import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../../Helper/ProductCategory";
import { useEffect, useState } from "react";
import Cart from "../../Components/Cart";
import SummaryApi from "../../common";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");

  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.filterProducts.url, {
        method: SummaryApi.filterProducts.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });
      const responseData = await response.json();
      let fetchedData = responseData?.data || [];

      setData(fetchedData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleOnchangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    // Apply sorting without mutating original array
    setData((prev) => {
      const sorted = [...prev];
      if (value === "asc") {
        sorted.sort((a, b) => a.sellingPrice - b.sellingPrice);
      } else if (value === "dsc") {
        sorted.sort((a, b) => b.sellingPrice - a.sellingPrice);
      }
      return sorted;
    });
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    );
    setFilterCategoryList(arrayOfCategory);

    // Format URL for selected filters
    const urlFormat = arrayOfCategory.map((el) => `category=${el}`).join("&");

    navigate("/product-category?" + urlFormat);
  }, [selectCategory]);

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          className="bg-white px-4 py-2 rounded font-semibold text-sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex lg:flex-row flex-col gap-4 relative">
        {/* Left Sidebar */}
        <div
          className={`bg-white p-4 rounded-lg w-full lg:w-[200px] h-auto lg:h-[calc(100vh-100px)] overflow-y-auto sticky top-[80px] ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          {/* Sort Section */}
          <div className="mb-6">
            <h3 className="text-base uppercase font-medium text-slate-800 border-b border-slate-300 pb-1">
              Sort By
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  value="asc"
                  onChange={handleOnchangeSortBy}
                  id="lowToHigh"
                />
                <label htmlFor="lowToHigh">Price - Low to High</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  value="dsc"
                  onChange={handleOnchangeSortBy}
                  id="highToLow"
                />
                <label htmlFor="highToLow">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter Section */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-800 border-b border-slate-300 pb-1">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={category.value}
                    value={category.value}
                    checked={!!selectCategory[category.value]}
                    id={category.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={category.value}>{category.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Product Display */}
        <div className="flex-1 overflow-y-auto">
          {!loading && data.length > 0 ? (
            <Cart data={data} loading={loading} />
          ) : (
            <div className="text-center text-gray-500 text-sm py-12">
              {loading ? "Loading products..." : "No products found."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
