const Category = require("../modules/categorymodule");
const record_per_page = require("../config/pagenation");
const Product = require("../modules/productmodule");
const category = require("../modules/categorymodule");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const upload_dir = path.resolve(
  __dirname,
  "../../frontend",
  "public",
  "images",
  "productsphoto"
);
const imageValidation = require("../utilites/validation_upload");

exports.getproducts = async (req, res, next) => {
  try {
    let query = {};
    let query_condtion = false;
    let price_option = {};
    let rating_option = {};

    if (req.query.price) {
      query_condtion = true;
      price_option = { price: { $lte: Number(req.query.price) } };
    }

    if (req.query.rating) {
      query_condtion = true;
      rating_option = { rating: { $in: req.query.rating.split(",") } };
    }
    let category_condtion = {};
    let categoryname = req.params.categoryname || "";
    if (categoryname) {
      query_condtion = true;
      let category_name = categoryname.replace(",", "/");
      var regEx = new RegExp("^" + category_name);
      category_condtion = { category: regEx };
    }
    if (req.query.category) {
      query_condtion = true;
      let category_name_array = req.query.category.split(",").map((item) => {
        if (item) return new RegExp("^" + item);
      });
      category_condtion = {
        category: { $in: category_name_array },
      };
    }

    let attrs_query_condtion = [];
    if (req.query.attrs) {
      attrs_query_condtion = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a1 = item.split("-");
          let values = [...a1];
          values.shift();
          let a2 = {
            attrs: { $elemMatch: { key: a1[0], value: { $in: values } } },
          };
          acc.push(a2);
          return acc;
        } else return acc;
      }, []);
      query_condtion = true;
    }
    const searchkey = req.params.searchkey || "";
    let searchkey_option = {};
    if (searchkey) {
      query_condtion = true;
      const regex = new RegExp(searchkey);
      // searchkey_option = { $regex: regex };

      searchkey_option = {
        name: { $regex: regex },
      };
    }

    if (query_condtion) {
      query = {
        $and: [
          price_option,
          rating_option,
          category_condtion,
          searchkey_option,
          ...attrs_query_condtion,
        ],
      };
    }

    const pagenum = req.query.pagenum * 1 || 1;
    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      const SortOptions = req.query.sort.split("_");
      sort = { [SortOptions[0]]: Number(SortOptions[1]) };
    }

    const total_products = await Product.countDocuments(query);
    const all_prosuct = await Product.find(query)
      .skip(record_per_page * (pagenum - 1))
      .sort(sort)
      .limit(record_per_page);
    res.status(200).json({
      length: all_prosuct.length,
      total_products: total_products,
      pagenum: pagenum,
      num_of_links: Math.ceil(total_products / record_per_page),
      all_prosuct,
    });
  } catch (err) {
    next(err);
  }
};

exports.getproductbyid = async (req, res, next) => {
  try {
    const spacefic_product = await Product.findById(
      req.params.productid
    ).orFail();

    res.status(200).json({
      data: spacefic_product,
    });
  } catch (err) {
    next(err);
  }
};

exports.getbestseller = async (req, res, next) => {
  try {
    const bestseller = await Product.aggregate([
      {
        $sort: { category: 1, sales: -1 },
      },

      { $group: { _id: "$category", max_sales: { $first: "$$ROOT" } } },
      { $replaceWith: "$max_sales" },

      { $project: { _id: 1, name: 1, description: 1, images: 1, category: 1 } },
      { $limit: 3 },
    ]);

    res.status(200).json({
      data: bestseller,
    });
  } catch (err) {
    next(err);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getadminproduct = async (req, res, next) => {
  try {
    const adminproduct = await Product.find({})
      .sort({ category: 1 })
      .select("name price category")
      .orFail();
    res.status(200).json({
      data: adminproduct,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteadminproduct = async (req, res, next) => {
  try {
    const which_delet = await Product.deleteOne({
      _id: req.params.id,
    }).orFail();

    res.status(200).json({
      message: "product deleted",
    });
  } catch (err) {
    next(err);
  }
};
exports.createadminproduct = async (req, res, next) => {
  try {
    const newone = new Product();
    const { name, description, category, price, attribute, count } = req.body;
    newone.name = name;
    newone.description = description;
    newone.category = category;
    newone.price = price;
    newone.count = count;
    if (attribute.length > 0) {
      attribute.map((attr) => {
        newone.attrs.push(attr);
      });
    }
    await newone.save();
    res.status(201).json({
      message: "product created",
      data: newone,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateadminproduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).orFail();
    const { name, description, category, price, attribute, count } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.count = count || product.count;
    if (attribute.length > 0) {
      product.attrs = [];
      attribute.map((attr) => {
        product.attrs.push(attr);
      });
    } else {
      product.attrs = product.attrs;
    }
    await product.save();
    res.status(200).json({
      message: "product updated",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

exports.adminupload = async (req, res, next) => {
  try {
    console.log(!req.files);
    console.log(req.files.images);
    if (!req.files || !!req.files.images === false) {
      return res.status(400).json({
        message: "no file uploaded",
      });
    }
    const product_id = req.query.productid;
    const product_witch_update = await Product.findById(product_id).orFail();

    const validate = imageValidation(req.files.images);
    if (validate.error) {
      return res.status(400).json({
        error: validate.error,
        message: "invalid file type",
      });
    }

    let imagearray = [];
    if (Array.isArray(req.files.images)) {
      imagearray = req.files.images;
    } else {
      imagearray.push(req.files.images);
    }

    for (let i = 0; i < imagearray.length; i++) {
      const image = imagearray[i];
      let filename = uuidv4() + path.extname(image.name);
      var upload_image_path = upload_dir + "/" + filename;

      product_witch_update.images.push({
        path: "/images/productsphoto/" + filename,
      });

      image.mv(upload_image_path, function (err) {
        if (err) {
          return res.status(400).send(err.message);
        }
      });
    }

    await product_witch_update.save();
    return res.send("image uploaded successfully");
  } catch (err) {
    next(err);
  }
};

exports.deleteimages = async (req, res, next) => {
  try {
    const imagepath = decodeURIComponent(req.params.imagepath);
    const system_image_path = path.resolve("../frontend/public") + imagepath;
    console.log(system_image_path);
    fs.unlink(system_image_path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    await Product.findByIdAndUpdate(
      { _id: req.params.productid },
      { $pull: { images: { path: imagepath } } }
    );
    return res.status(200).json({
      message: "product image has removed from system and darabase",
    });
  } catch (err) {
    next(err);
  }
};
// exports.updateadminproduct = async (req, res, next) => {
//   try {
//     const which_update = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     ).orFail();
//     res.send("product updated");
//   } catch (err) {
//     next(err);
//   }
// };
