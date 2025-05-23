import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../../Helper/ProductCategory";
import { useEffect, useState } from "react";
import Cart from "../../Components/Cart";
import SummaryApi from "../../common";

const CategoryProduct = () => {
  const params = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy]= useState("")

  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");

  console.log("urlCategoryListInArray", urlCategoryListInArray);

  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  console.log("urlCategoryListInArray", urlCategoryListObject);
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
      console.log(responseData.data);
      setData(responseData?.data || []);
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

  const handleOnchangeSortBy = (e)=>{
    const {value} = e.target;

    setSortBy(value);
    if(value === 'asc'){
        setData(prev => prev.sort((a,b)=> a.sellingPrice - b.sellingPrice))
    }
    if(value === 'dsc'){
        setData(prev => prev.sort((a,b)=> b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(()=>{
    
  },[sortBy])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (key) => selectCategory[key]
    );
    setFilterCategoryList(arrayOfCategory);
//formate for url change when change on the checkbox
    const urlFormate = arrayOfCategory.map(((el, index) => {
        if((arrayOfCategory.length - 1) === index ){
            return `category=${el}`
        }
        return `category=${el}&&`
    }))

    navigate('/product-category?'+urlFormate.join(''))
  }, [selectCategory]);

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          className="bg-yellow-400 px-4 py-2 rounded font-semibold text-sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[200px,1fr] gap-4">
        {/* Left Sidebar */}
        <div
          className={`bg-yellow-100 p-4 rounded-lg min-h-[200px] lg:min-h-[calc(100vh-100px)] ${
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
                <input type="radio" name="sortBy" checked={sortBy === 'asc'} value={"asc"} onChange={handleOnchangeSortBy} id="lowToHigh" />
                <label htmlFor="lowToHigh">Price - Low to High</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="sortBy" checked={sortBy === 'dsc'} value={"dsc"} onChange={handleOnchangeSortBy} id="highToLow" />
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
        <div>
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
