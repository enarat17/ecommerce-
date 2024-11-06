"use client";
import { useState, useEffect } from 'react';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  Category
} from '@/components/types/Category';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleAddCategory = () => {
    addCategory(newCategoryName);
    setCategories(getCategories());
    setNewCategoryName('');
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id);
    setCategories(getCategories());
  };

  const handleUpdateCategory = () => {
    if (editingCategoryId !== null) {
      updateCategory(editingCategoryId, editingCategoryName);
      setCategories(getCategories());
      setEditingCategoryId(null);
      setEditingCategoryName('');
    }
  };

  const handleEditCategory = (id: number, name: string) => {
    setEditingCategoryId(id);
    setEditingCategoryName(name);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>

      <div className="mb-4 w-[1200px] border border-zinc-300 rounded-lg p-4 ">
        <h2 className="text-xl font-semibold mb-2">Current Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between mb-2">
              <span className='font-semibold'>{category.name}</span>
              <div>
                <button
                  onClick={() => handleEditCategory(category.id, category.name)}
                  className="bg-sky-600 hover:bg-sky-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 hover:bg-red-400 text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4 w-[1200px] border border-zinc-300 rounded-lg p-4">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-xl font-semibold mr-2">Add Category</h2>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New Category Name"
            className="border p-2 rounded mr-2 w-[700px]"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Category
          </button>
        </div>
      </div>

      {editingCategoryId !== null && (
        <div className="mb-4 w-[1200px] border border-zinc-300 rounded-lg p-4">
            <div className="w-full flex items-center justify-between">
            <h2 className="text-xl font-semibold mr-2">Edit Category</h2>
            <input
              type="text"
              value={editingCategoryName}
              onChange={(e) => setEditingCategoryName(e.target.value)}
              placeholder="Edit Category Name"
              className="border p-2 rounded mr-2"
            />
            <button
              onClick={handleUpdateCategory}
              className="bg-green-500 text-white p-2 rounded"
            >
              Update Category
            </button>
            <button
              onClick={() => {
                setEditingCategoryId(null);
                setEditingCategoryName('');
              }}
              className="bg-gray-500 text-white p-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
