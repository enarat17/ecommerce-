const catchAsync = require("./../utils/catchAsync");
const Product = require("./../models/productModel");
const factory = require("./FactoryHandlers");

// // routes
exports.getAllProducts = factory.getAll(Product);
exports.getOneProduct = factory.getOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.createProduct = factory.createOne(Product);

//download
exports.downloadFile = catchAsync(async (req, res) => {
  const productFile = await Product.findById(req.params.productId);
  if (!productFile) {
    return res.status(404).json({ message: "Product not found" });
  }
  const { document } = productFile;
  const filePath = `./../frontend/public/files/products/${document}`;
  res.download(filePath, err => {
    if (err) {
      return res.status(500).send("Error occurred while downloading the file");
    }
    res.status(200).json("file downloaded");
  });
});
