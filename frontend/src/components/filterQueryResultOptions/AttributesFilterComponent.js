import React from 'react';

const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter, isRTL = false }) => {
  return (
    <div 
      className={`w-full max-w-md ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {attrsFilter && attrsFilter.length > 0 && (
        <div className="space-y-4">
          {attrsFilter.map((filter, idx) => (
            <div 
              key={`${filter.key}-${idx}`}
              className={`bg-white rounded-lg shadow-sm p-4 border border-gray-200 
                ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {filter.key}
              </h3>
              <div className="space-y-2">
                {filter.value.map((valueForKey, idx2) => (
                  <label
                    key={`${valueForKey}-${idx2}`}
                    className={`flex items-center group cursor-pointer
                      ${isRTL ? 'space-x-reverse' : 'space-x-3'}`}
                  >
                    <input
                      type="checkbox"
                      className={`form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 
                        focus:ring-blue-500 ${isRTL ? 'ml-3' : 'mr-3'}`}
                      onChange={(e) => {
                        setAttrsFromFilter(filters => {
                          if (filters.length === 0) {
                            return [{ key: filter.key, values: [valueForKey] }];
                          }

                          let index = filters.findIndex((item) => item.key === filter.key);
                          if (index === -1) {
                            return [...filters, { key: filter.key, values: [valueForKey] }];
                          }

                          if (e.target.checked) {
                            filters[index].values.push(valueForKey);
                            let unique = [...new Set(filters[index].values)];
                            filters[index].values = unique;
                            return [...filters];
                          }

                          let valuesWithoutUnChecked = filters[index].values.filter(
                            (val) => val !== valueForKey
                          );
                          filters[index].values = valuesWithoutUnChecked;
                          if (valuesWithoutUnChecked.length > 0) {
                            return [...filters];
                          } else {
                            let filtersWithoutOneKey = filters.filter(
                              (item) => item.key !== filter.key
                            );
                            return [...filtersWithoutOneKey];
                          }
                        });
                      }}
                    />
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {valueForKey}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttributesFilterComponent;