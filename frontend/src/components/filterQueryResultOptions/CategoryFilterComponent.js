import React, { useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { ChevronDown } from 'lucide-react';

const CategoryFilterComponent = ({ setCategoriesFromFilter, isRTL = false }) => {
  const { categories } = useSelector((state) => state.getCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const myRefs = useRef([]);

  const translations = {
    category: {
      en: "Category",
      ar: "الفئة"
    },
    collapse: {
      en: "Collapse categories",
      ar: "طي الفئات"
    },
    expand: {
      en: "Expand categories",
      ar: "توسيع الفئات"
    }
  };

  const t = (key) => translations[key][isRTL ? 'ar' : 'en'];

  const selectCategory = (e, category, idx) => {
    setCategoriesFromFilter((items) => {
      return { ...items, [category.name]: e.target.checked };
    });

    var selectedMainCategory = category.name.split("/")[0];
    var allCategories = myRefs.current.map((_, id) => {
      return { name: categories[id].name, idx: id };
    });
    var indexesOfMainCategory = allCategories.reduce((acc, item) => {
      var cat = item.name.split("/")[0];
      if (selectedMainCategory === cat) {
        acc.push(item.idx);
      }
      return acc;
    }, []);

    if (e.target.checked) {
      setSelectedCategories((old) => [...old, "cat"]);
      myRefs.current.map((_, idx) => {
        if (!indexesOfMainCategory.includes(idx)) myRefs.current[idx].disabled = true;
        return "";
      });
    } else {
      setSelectedCategories((old) => {
        var a = [...old];
        a.pop();
        if (a.length === 0) {
          window.location.href = "/product-list";
        }
        return a;
      });
      myRefs.current.map((_, idx2) => {
        if (allCategories.length === 1) {
          if (idx2 !== idx) myRefs.current[idx2].disabled = false;
        } else if (selectedCategories.length === 1) myRefs.current[idx2].disabled = false;
        return "";
      });
    }
  };

  return (
    <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          w-full
          flex items-center justify-between
          py-2 px-1
          text-gray-700
          hover:text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          rounded-md
          ${isRTL ? 'flex-row-reverse' : ''}
        `}
        aria-expanded={isExpanded}
        aria-controls="category-list"
        title={isExpanded ? t('collapse') : t('expand')}
      >
        <span className="font-semibold">
          {t('category')}
        </span>
        <ChevronDown 
          className={`
            w-5 h-5 
            transition-transform duration-200
            ${isExpanded ? 'transform rotate-180' : ''}
            ${isRTL ? 'ml-2' : 'mr-2'}
          `}
        />
      </button>

      <div
        id="category-list"
        className={`
          space-y-2
          transition-all duration-200 ease-in-out
          ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
        `}
      >
        {categories.map((category, idx) => (
          <div 
            key={idx}
            className={`
              flex items-center gap-2 
              ${isRTL ? 'flex-row-reverse' : 'flex-row'}
            `}
          >
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                ref={(el) => (myRefs.current[idx] = el)}
                className="
                  sr-only peer
                "
                onChange={(e) => selectCategory(e, category, idx)}
              />
              <div className="
                w-5 h-5
                border-2 border-gray-300
                rounded
                peer-checked:bg-blue-600
                peer-checked:border-blue-600
                peer-disabled:bg-gray-200
                peer-disabled:border-gray-300
                peer-disabled:cursor-not-allowed
                after:content-['']
                after:absolute
                after:opacity-0
                peer-checked:after:opacity-100
                after:w-2 after:h-3
                after:border-r-2 after:border-b-2
                after:border-white
                after:rotate-45
                after:top-[2px]
                after:left-[6px]
                transition-all
                duration-200
                hover:border-blue-500
                peer-focus:ring-2
                peer-focus:ring-blue-500/50
                peer-focus:ring-offset-2
              ">
              </div>
            </label>

            <span className={`
              text-sm text-gray-700
              ${myRefs.current[idx]?.disabled ? 'text-gray-400' : ''}
            `}>
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilterComponent;