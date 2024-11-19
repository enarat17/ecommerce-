import CategoryCard from "./CategoryCardComponent";
const CategoryGrid = ({ 
    categories, 
    language = 'en',
    onCategoryClick 
  }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            language={language}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </div>
    );
  };
  
  export default CategoryGrid;