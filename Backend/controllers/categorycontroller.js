const Category = require("../models/CategoryModel");
const mongoose = require("mongoose");

exports.getCategories = async (req, res, next) => {
  try {
    const category_data = await Category.find({}).sort({ nmae: 1 }).orFail();

    res.status(200).json({
      category_data,
    });
  } catch (err) {
    next(err);
  }
};

exports.newCategory = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data) {
      throw new Error("category daya is  required");
    } else {
      const category_exist = await Category.findOne({ name: req.body.name });
      if (category_exist) {
        res.status(400).send("there is category name like that ");
      } else {
        const category_created = await Category.create(req.body);
        res.status(201).json({
          category_created,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryexist = await Category.findOne({
      name: decodeURIComponent(req.params.category),
    }).orFail();
    await categoryexist.deleteOne({ name: req.params.category });
    res.status(200).json({
      message: "category deleted done",
    });
  } catch (err) {
    next(err);
  }
};

exports.saveAttr = async (req, res, next) => {
  const { key, value, choosencategory } = req.body;
  if ((!key, !value, !choosencategory)) {
    res.send("key , value , categoryname  are required");
  }
  try {
    const category_exist = await Category.findOne({
      name: choosencategory,
    }).orFail();
    if (category_exist.attrs.length > 0) {
      var key_is_not_exist = true;
      category_exist.attrs.map((item, index) => {
        if (item.key === key) {
          key_is_not_exist = false;
          var new_copy_of_category = [...category_exist.attrs[index].value];
          new_copy_of_category.push(value);
          var new_attr = [...new Set(new_copy_of_category)];
          category_exist.attrs[index].value = new_attr;
        }
      });

      if (key_is_not_exist) {
        category_exist.attrs.push({ key: key, value: [value] });
      }
    } else {
      category_exist.attrs.push({ key: key, value: [value] });
    }
    await category_exist.save();
    let category_data = await Category.find({}).sort({ name: 1 });
    return res.status(201).json({
      category_data,
    });
  } catch (err) {
    next(err);
  }
};
