import React, { useEffect, useState, useRef, useContext } from "react";
import { Rating } from "react-simple-star-rating";
import ImageZoom from "js-image-zoom";
import { useParams } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import MetaComponent from "../../components/MetaComponent";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductImage = ({ image, index }) => {
  const imageRef = useRef(null);

  // useEffect(() => {
  //   if (imageRef.current) {
  //     const options = {
  //       scale: 2,
  //       offset: { vertical: 0, horizontal: 0 },
  //       zoomContainer: imageRef.current.parentElement,
  //     };

  //     const zoom = new ImageZoom(imageRef.current, options);
      
  //     // Cleanup zoom instance on unmount or before reinitializing
  //     return () => {
  //       if (zoom && zoom.kill) {
  //         zoom.kill();
  //       }
  //     };
  //   }
  // }, [image, index]);

  return (
    <div 
      className="relative w-full aspect-square" 
      style={{ maxHeight: '600px' }}
    >
      <img
        ref={imageRef}
        crossOrigin="anonymous"
        src={image.path ?? null}
        alt={`Product ${index + 1}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
  userInfo,
  writeReviewApiRequest
}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productReviewed, setProductReviewed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language } = useContext(LanguageContext);
  const isRtl = language === 'ar';
  const messagesEndRef = useRef(null);

  // Existing handlers and effects remain the same
  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  useEffect(() => {
    if (productReviewed) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [productReviewed]);

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [getProductDetails, id, productReviewed]);

  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      writeReviewApiRequest(product._id, formInputs)
        .then(data => {
          if (data === "review created") {
            setProductReviewed("You successfully reviewed the page!");
          }
        })
        .catch((er) => setProductReviewed(er.response.data.message ? er.response.data.message : er.response.data));
    }
  };

  const translations = {
    productDetails: {
      en: "Product Details",
      ar: "تفاصيل المنتج"
    },
    loading: {
      en: "Loading product details ...",
      ar: "جاري تحميل تفاصيل المنتج ..."
    },
    inStock: {
      en: "In Stock",
      ar: "متوفر"
    },
    outOfStock: {
      en: "Out of Stock",
      ar: "نفذ من المخزون"
    },
    quantity: {
      en: "Quantity",
      ar: "الكمية"
    },
    addToCart: {
      en: "Add to Cart",
      ar: "أضف إلى السلة"
    },
    reviews: {
      en: "Reviews",
      ar: "التقييمات"
    },
    writeReview: {
      en: "Write a Review",
      ar: "اكتب تقييماً"
    },
    loginFirst: {
      en: "Login first to write a review",
      ar: "سجل الدخول أولاً لكتابة تقييم"
    },
    submit: {
      en: "Submit",
      ar: "إرسال"
    },
    price: {
      en: "Price",
      ar: "السعر"
    }
  };

  const t = (key) => translations[key][language] || translations[key].en;

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-r from-blue-900/90 to-gray-900/90">
      <MetaComponent title={product.name} description={product.description} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AddedToCartMessageComponent
          showCartMessage={showCartMessage}
          setShowCartMessage={setShowCartMessage}
          isRtl={isRtl}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Carousel Section */}
          <div className="relative bg-white rounded-lg shadow-sm p-4">
            <div className="relative overflow-hidden rounded-lg">
              {product.images && product.images.length > 0 && (
                <ProductImage 
                  image={product.images[currentImageIndex]} 
                  index={currentImageIndex} 
                />
              )}
            </div>

          {product.images && product.images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="flex justify-center mt-4 gap-2">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex">
                  <Rating
                    readonly
                    size={20}
                    initialValue={product.rating}
                    className="flex-row"
                  />
                </div>
                <span className="text-gray-600">({product.reviewsNumber})</span>
              </div>

              <div className="text-xl font-semibold mb-4">
                {t('price')}: ${product.price}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t('quantity')}:</span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {[...Array(product.count).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">{isRtl ? "الحالة:":"status:"}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    product.count > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.count > 0 ? t('inStock') : t('outOfStock')}
                  </span>
                </div>

                <button
                  onClick={addToCartHandler}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('addToCart')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - Centered with controlled width */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('reviews')}</h2>
            
            <div className="space-y-6">
              {product.reviews?.map((review, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-6">
                  <div className="font-medium">{review.user.name}</div>
                  <div className="flex items-center gap-2 my-2">
                    <Rating 
                      readonly 
                      size={20} 
                      initialValue={review.rating}
                      className="flex-row"
                    />
                    <span className="text-gray-500 text-sm">
                      {review.createdAt.substring(0, 10)}
                    </span>
                  </div>
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Review Form */}
            {!userInfo.name && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-6">
                {t('loginFirst')}
              </div>
            )}

            <form onSubmit={sendReviewHandler} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('writeReview')}
                </label>
                <textarea
                  name="comment"
                  required
                  disabled={!userInfo.name}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <select
                name="rating"
                required
                disabled={!userInfo.name}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Your rating</option>
                <option value="5">5 (very good)</option>
                <option value="4">4 (good)</option>
                <option value="3">3 (average)</option>
                <option value="2">2 (bad)</option>
                <option value="1">1 (awful)</option>
              </select>

              <button
                type="submit"
                disabled={!userInfo.name}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {t('submit')}
              </button>

              {productReviewed && (
                <div className="text-green-600 mt-2 text-center">{productReviewed}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );

};
export default ProductDetailsPageComponent;

