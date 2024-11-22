const Category = require("../models/CategoryModel")
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const imageValidate = require("../utils/imageValidate")


const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort({name: "asc"}).orFail()
        res.json(categories)
    } catch(error) {
        next(error)
    }
}

const newCategory = async (req, res, next) => {
    try {
        const { name, description, attrs } = req.body;

        // Check if the category already exists
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({
                message: "Category already exists",
                existingCategory: categoryExists,
            });
        }

        // Create category object with default or provided values
        const categoryData = {
            name,
            description: description || "default category description",
            attrs: attrs || [],
        };

        // Handle image upload if file exists in the request
        if (req.files && req.files.image) {
            const validateResult = imageValidate(req.files.image);
            if (validateResult.error) {
                return res.status(400).json({ message: validateResult.error });
            }

            const uploadDirectory = path.resolve(
                __dirname,
                "../../frontend",
                "public",
                "images",
                "categories"
            );

            const image = req.files.image;
            const fileName = uuidv4() + path.extname(image.name);
            const uploadPath = path.join(uploadDirectory, fileName);

            // Move the uploaded image to the directory
            image.mv(uploadPath, function (err) {
                if (err) {
                    return res.status(500).json({ message: "Image upload failed", error: err.message });
                }
            });

            // Set the image path in the category data
            categoryData.image = `/images/categories/${fileName}`;
        }

        // Create and save the new category
        const categoryCreated = await Category.create(categoryData);

        res.status(201).json({
            message: "Category created successfully",
            categoryCreated,
        });

    } catch (err) {
        console.error("Category Creation Error:", err);

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation Error",
                errors: Object.values(err.errors).map((e) => e.message),
            });
        }

        next(err);
    }
};


const deleteCategory = async (req, res, next) => {
    // return res.send(req.params.category)
    try {
        if(req.params.category !== "Choose category") {
            const categoryExists = await Category.findOne({
                name: decodeURIComponent(req.params.category)
            }).orFail()
            await categoryExists.remove()
            res.json({categoryDeleted: true})
        }
    } catch (err) {
        next(err)
    }
}

const saveAttr = async (req, res, next) => {
    const {key, val, categoryChoosen} = req.body
    if(!key || !val || !categoryChoosen) {
        return res.status(400).send("All inputs are required")
    }
    try {
        const category = categoryChoosen.split("/")[0]
        const categoryExists = await Category.findOne({name: category}).orFail()
        if(categoryExists.attrs.length > 0) {
            // if key exists in the database then add a value to the key
            var keyDoesNotExistsInDatabase = true
            categoryExists.attrs.map((item, idx) => {
                if(item.key === key) {
                    keyDoesNotExistsInDatabase = false
                    var copyAttributeValues = [...categoryExists.attrs[idx].value]
                    copyAttributeValues.push(val)
                    var newAttributeValues = [...new Set(copyAttributeValues)] // Set ensures unique values
                    categoryExists.attrs[idx].value = newAttributeValues
                }
            })

            if(keyDoesNotExistsInDatabase) {
                categoryExists.attrs.push({key: key, value: [val]})
            }
        } else {
            // push to the array
            categoryExists.attrs.push({key: key, value: [val]})
        }
        await categoryExists.save()
        let cat = await Category.find({}).sort({name: "asc"})
        return res.status(201).json({categoriesUpdated: cat})
    } catch(err) {
        next(err)
    }
}



module.exports = {getCategories, newCategory, deleteCategory, saveAttr}