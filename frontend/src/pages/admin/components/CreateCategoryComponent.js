import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const CreateCategoryComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    attrs: [{ key: '', value: [] }]
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const addAttr = () => {
    setFormData({
      ...formData,
      attrs: [...formData.attrs, { key: '', value: [] }]
    });
  };

  const removeAttr = (index) => {
    const newAttrs = formData.attrs.filter((_, i) => i !== index);
    setFormData({ ...formData, attrs: newAttrs });
  };

  const updateAttr = (index, field, value) => {
    const newAttrs = [...formData.attrs];
    if (field === 'value') {
      // Split by comma and trim whitespace
      value = value.split(',').map(v => v.trim());
    }
    newAttrs[index] = { ...newAttrs[index], [field]: value };
    setFormData({ ...formData, attrs: newAttrs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    if (formData.image) {
      submitData.append('image', formData.image);
    }
    if (formData.attrs.some(attr => attr.key && attr.value.length)) {
      submitData.append('attrs', JSON.stringify(formData.attrs));
    }

    try {
      // Replace with your API endpoint
      const response = await fetch('/api/categories', {
        method: 'POST',
        body: submitData
      });
      
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      
      // Clear form after successful submission
      setFormData({
        name: '',
        description: '',
        image: null,
        attrs: [{ key: '', value: [] }]
      });
      
      alert('Submitted successfully!');
    } catch (error) {
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-5 bg-gray-50 rounded border border-gray-400 my-5">
      <div>
        <h2 className="text-2xl font-bold">New category</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-medium">Name</label>
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter name"
              className='w-full p-2 rounded border border-gray-400'
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter description"
              rows={4}
              className='w-full p-2 rounded border border-gray-400'
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block font-medium">Attributes (Optional)</label>
              <button type="button" onClick={addAttr} className='flex items-center p-2 rounded text-white bg-slate-800 hover:bg-slate-600'>
                <Plus className="h-4 w-4 mr-1 inline" /> Add Attribute
              </button>
            </div>
            
            {formData.attrs.map((attr, index) => (
              <div key={index} className="flex gap-4 items-start">
                <input
                  placeholder="Key"
                  value={attr.key}
                  onChange={(e) => updateAttr(index, 'key', e.target.value)}
                  className="flex-1 w-full p-2 rounded border border-gray-400"
                />
                <input
                  placeholder="Values (comma-separated)"
                  value={attr.value.join(', ')}
                  onChange={(e) => updateAttr(index, 'value', e.target.value)}
                  className="flex-1 w-full p-2 rounded border border-gray-400"
                />
                <button 
                  type="button"
                  onClick={() => removeAttr(index)}
                  className='flex items-center p-2 rounded text-white bg-red-800 hover:bg-red-600'
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className='w-full text-center font-bold p-2 rounded text-white bg-slate-800 hover:bg-slate-600'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryComponent;