const multer = require("multer");
const AppError = require("../utils/appError");

// Date format
const now = new Date();
const formattedDate = `${now.getDate()}-${now.getMonth() +
  1}-${now.getFullYear()}`;

// Create storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let uploadPath = "./../frontend/public/"; // Base directory

    if (file.mimetype.startsWith("image")) {
      uploadPath = `${uploadPath}/imgs/images`; // Save images in /imgs/images
    } else if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel.sheet.macroenabled.12"
    ) {
      uploadPath = `${uploadPath}/documents`; // Save documents in /documents
    }

    cb(null, uploadPath); // Set the upload path
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${formattedDate}-${file.originalname}`);
  }
});

// Initialize multer with storage configuration
const upload = multer({
  storage: storage,
  limits: {
    fieldNameSize: 500,
    fileSize: 1024 * 1024 * 100 // Limit file size to 100MB
  },
  fileFilter: function(req, file, cb) {
    // Accept images, PDFs, Excel sheets, and Word files
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "image/webp",
      "application/pdf",
      "application/vnd.ms-excel",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel.sheet.macroenabled.12"
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Unsupported file type!", 400), false);
    }
  }
});

exports.uploadFiles = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "memberImage", maxCount: 1 },
  { name: "clientImage", maxCount: 1 },
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 3 },
  { name: "file", maxCount: 1 },
  { name: "HR_Store", maxCount: 1 },
  { name: "Financial_Store", maxCount: 1 },
  { name: "storePage", maxCount: 1 },
  { name: "loggingPage", maxCount: 1 },
  { name: "blogsPage", maxCount: 1 },
  { name: "businessServices", maxCount: 1 },
  { name: "accountingServices", maxCount: 1 },
  { name: "auditingServices", maxCount: 1 },
  { name: "financialServices", maxCount: 1 },
  { name: "HrServices", maxCount: 1 },
  { name: "servicesPage", maxCount: 1 },
  { name: "aboutUsPage", maxCount: 1 }
]);
