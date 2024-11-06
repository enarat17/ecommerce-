export interface Category {
    id:number;
    name:string;
}

let categories: Category[] = [
    { id: 0, name: "Financial" },
    { id: 1, name: "HR" },
];

export const getCategories = () => categories;

export const addCategory = (name:string) => {
    categories.push({ id: categories.length, name });
    return categories
};

export const updateCategory = (id:number, name:string) => {
    const index = categories.findIndex(category => category.id === id);
    categories[index].name = name;
    return categories;
};

export const deleteCategory = (id:number) => {
    const index = categories.findIndex(category => category.id === id);
    categories.splice(index, 1);
    return categories;
};

