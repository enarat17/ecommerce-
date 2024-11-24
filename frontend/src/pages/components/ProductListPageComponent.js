
import PaginationComponent from "../../components/PaginationComponent";
import ProductForListComponent from "../../components/ProductForListComponent";
import SortOptionsComponent from "../../components/SortOptionsComponent";
import PriceFilterComponent from "../../components/filterQueryResultOptions/PriceFilterComponent";
import RatingFilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent";
import CategoryFilterComponent from "../../components/filterQueryResultOptions/CategoryFilterComponent";
import AttributesFilterComponent from "../../components/filterQueryResultOptions/AttributesFilterComponent";
import {LanguageContext} from "../../context/LanguageContext";

import { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const ProductListPageComponent = ({ getProducts, categories }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attrsFilter, setAttrsFilter] = useState([]); // collect category attributes from db and show on the webpage
  const [attrsFromFilter, setAttrsFromFilter] = useState([]); // collect user filters for category attributes
  const [showResetFiltersButton, setShowResetFiltersButton] = useState(false);
  const {language} = useContext(LanguageContext);
  const isRTL = language === "ar";

  const [filters, setFilters] = useState({}); // collect all filters
  const [price, setPrice] = useState(500);
  const [ratingsFromFilter, setRatingsFromFilter] = useState({});
  const [categoriesFromFilter, setCategoriesFromFilter] = useState({});
  const [sortOption, setSortOption] = useState("");
  const [paginationLinksNumber, setPaginationLinksNumber] = useState(null);
  const [pageNum, setPageNum] = useState(null);

  const { categoryName } = useParams() || "";
  const { pageNumParam } = useParams() || 1;
  const { searchQuery } = useParams() || "";
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryName) {
      let categoryAllData = categories.find(
        (item) => item.name === categoryName.replaceAll(",", "/")
      );
      if (categoryAllData) {
        let mainCategory = categoryAllData.name.split("/")[0];
        let index = categories.findIndex((item) => item.name === mainCategory);
        setAttrsFilter(categories[index].attrs);
      }
    } else {
      setAttrsFilter([]);
    }
  }, [categoryName, categories]);

  useEffect(() => {
    if (Object.entries(categoriesFromFilter).length > 0) {
      setAttrsFilter([]);
      var cat = [];
      var count;
      Object.entries(categoriesFromFilter).forEach(([category, checked]) => {
        if (checked) {
          var name = category.split("/")[0];
          cat.push(name);
          count = cat.filter((x) => x === name).length;
          if (count === 1) {
            var index = categories.findIndex((item) => item.name === name);
            setAttrsFilter((attrs) => [...attrs, ...categories[index].attrs]);
          }
        }
      });
    }
  }, [categoriesFromFilter, categories]);

  useEffect(() => {
    getProducts(categoryName, pageNumParam, searchQuery, filters, sortOption)
      .then((products) => {
        setProducts(products.products);
        setPaginationLinksNumber(products.paginationLinksNumber);
        setPageNum(products.pageNum);
        setLoading(false);
      })
      .catch((er) => {
        console.log(er);
        setError(true);
      });
  }, [categoryName, pageNumParam, searchQuery, filters, sortOption, getProducts]);

  const handleFilters = () => {
     navigate(location.pathname.replace(/\/[0-9]+$/, "")); 
    setShowResetFiltersButton(true);
    setFilters({
      price: price,
      rating: ratingsFromFilter,
      category: categoriesFromFilter,
      attrs: attrsFromFilter,
    });
  };

  const resetFilters = () => {
    setShowResetFiltersButton(false);
    setFilters({});
    window.location.href = "/product-list";
  };

  return (
  <div className="px-4 bg-gradient-to-r from-blue-900/90 to-gray-900/90 w-full" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="md:w-1/4 my-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 space-y-4">
              <div className="mb-6">
                <SortOptionsComponent setSortOption={setSortOption} isRTL={isRTL} />
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">{isRTL?"التصفية":"Filters"}</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <PriceFilterComponent price={price} setPrice={setPrice} isRTL={isRTL} />
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <RatingFilterComponent setRatingsFromFilter={setRatingsFromFilter} isRTL={isRTL} />
                  </div>

                  {!location.pathname.match(/\/category/) && (
                    <div className="bg-gray-50 p-3 rounded">
                      <CategoryFilterComponent setCategoriesFromFilter={setCategoriesFromFilter} isRTL={isRTL} />
                    </div>
                  )}

                  <div className="bg-gray-50 p-3 rounded">
                    <AttributesFilterComponent
                      attrsFilter={attrsFilter}
                      setAttrsFromFilter={setAttrsFromFilter}
                      isRTL={isRTL}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {isRTL ? "تطبيق التصفية" : "Apply Filters"}
                </button>
                {showResetFiltersButton && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    {isRTL ? "إعادة تعيين التصفية" : "Reset Filters"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:w-3/4">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <h1 className="text-xl text-gray-600">{isRTL ? "جاري تحميل المنتجات ...":"Loading products ... "}</h1>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-48">
              <h1 className="text-xl text-red-600">{isRTL ? "خطأ اثناء تحميل المنتجات":"Error while loading products. Try again later."}</h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {products.map((product) => (
                <ProductForListComponent
                  key={product._id}
                  images={product.images}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  rating={product.rating}
                  reviewsNumber={product.reviewsNumber}
                  productId={product._id}
                  isRTL={isRTL}
                />
              ))}
            </div>
          )}

          {paginationLinksNumber > 1 && (
            <div className="mt-8">
              <PaginationComponent
                categoryName={categoryName}
                searchQuery={searchQuery}
                paginationLinksNumber={paginationLinksNumber}
                pageNum={pageNum}
                isRTL={isRTL}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPageComponent;
