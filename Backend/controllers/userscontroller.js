const Users = require("../modules/usermodule");
const Review = require("../modules/reviewmodule");
const Product = require("../modules/productmodule");
const objectid = require("mongodb").ObjectId;
const { hashpass } = require("../utilites/hashpass");
const jwtwebtoken = require("../utilites/jwt");
const { passcompare } = require("../utilites/hashpass");
const jwt = require("jsonwebtoken");

exports.getusers = async (req, res, next) => {
  try {
    const users = await Users.find({})
      .sort({ name: 1 })
      .select("name lastname email isadmin ")
      .orFail();
    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.registeruser = async (req, res, next) => {
  try {
    const { name, lastname, email, pass, phone, address, isadmin } = req.body;

    if (!(name && lastname && email && pass && address && phone)) {
      throw new Error("name, lastname, email and password are required");
    }

    const new_user = await Users.findOne({ email });
    if (new_user) {
      throw new Error("email already exist");
    }
    const Hashpassword = hashpass(pass);
    const user = await Users.create({
      name,
      lastname,
      pass: Hashpassword,
      email,
      phone,
      address,
      isadmin,
    });

    return res
      .cookie(
        "access_token",
        jwtwebtoken(
          user._id,
          user.name,
          user.lastName,
          user.email,
          user.isadmin
        ),
        {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        }
      )
      .status(201)
      .json({
        message: "eamil is created",
        user: {
          _id: user._id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          isadmin: user.isadmin,
          phone: user.phone,
          address: user.address,
        },
      });
  } catch (err) {
    next(err);
  }
};

// exports.loginuser = async (req, res, next) => {
//   try {
//     const { email, password, doNotLogout } = req.body;
//     if (!(email && password)) {
//       return res.status(400).send("all fields are required");
//     }
//     const user = await Users.findOne({ email }).orFail();
//     const donepass = passcompare(password, user.pass);

//     if (user && donepass) {
//       // let cookie_option = {
//       //   httpOnly: true,
//       //   secure: true,
//       //   sameSite: "strict",
//       // };
//       // if (doNotLogout) {
//       //   cookie_option = {
//       //     ...cookie_option,
//       //     maxAge: 1000 * 60 * 60 * 24 * 7,
//       //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
//       //   };
//       // }

//       // const token = jwtwebtoken(
//       //   user.name,
//       //   user.lastname,
//       //   user.phone,
//       //   user.address,
//       //   user.email,
//       //   user.isadmin,
//       //   user._id
//       // );
//       const token = jwt.sign(
//         {
//           name: user.name,
//           lastname: user.lastname,
//           email: user.email,
//           isadmin: user.isadmin,
//           _id: user._id,
//           phone: user.phone,
//           address: user.address,
//         },
//         process.env.JWT_SEC_KEY,
//         {
//           expiresIn: "7h",
//         }
//       );
//       if (token) {
//         res.cookie("usertoken", token, {
//           expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
//           httpOnly: true,
//           sameSite: "strict",
//         });
//       }

//       return res.status(200).json({
//         message: "success_login",
//         doNotLogout: doNotLogout,
//         token: token,
//         user: {
//           _id: user._id,
//           name: user.name,
//           lastname: user.lastname,
//           email: user.email,
//           isadmin: user.isadmin,
//         },
//       });
//     } else {
//       return res.status(400).send("email or password is wrong");
//     }
//   } catch (err) {
//     next(err);
//   }
// };

exports.loginuser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }

    const user = await Users.findOne({ email });
    const donepass = passcompare(password, user.pass);
    if (user && donepass) {
      // to do: compare passwords
      let cookieParams = {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      };

      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 }; // 1000=1ms
      }
      res.cookie("cookieName", "cookieValue", {
        maxAge: 900000,
        httpOnly: true,
      });

      // const token = jwt.sign({ user: user._id }, process.env.JWT_SEC_KEY, {
      //   expiresIn: "90h",
      // });
      //res.cookie("jwt", token, cookieParams);
      return res
        .cookie(
          "access_token",
          jwtwebtoken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isadmin
          ),
          cookieParams
        )
        .json({
          message: "success_login",
          user: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isadmin: user.isadmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).send("wrong credentials");
    }
  } catch (err) {
    next(err);
  }
};

exports.updateprofile = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id).orFail();

    user.name = req.body.name || user.name;
    user.lastname = req.body.lastname || user.lastname;
    //user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;
    user.country = req.body.country || user.country;
    user.city = req.body.city || user.city;
    user.zipcode = req.body.zipcode || user.zipcode;
    user.isadmin = user.isadmin;
    if (req.body.pass !== user.pass) {
      user.pass = hashpass(req.body.pass);
    }
    await user.save();
    res.status(200).json({
      message: "profile updated",
      user: {
        _id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        isadmin: user.isadmin,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getprofiledata = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id).orFail();
    res.send(user);
  } catch (er) {
    next(err);
  }
};

exports.makereview = async (req, res, next) => {
  try {
    const { comment, rating } = req.body;
    if (!(comment && rating)) {
      return res.send("comment and rating are required");
    }
    let review_id = new objectid();
    await Review.create([
      {
        _id: review_id,
        user: {
          _id: req.user._id,
          name: req.user.name + " " + req.user.lastname,
        },
        comment,
        rating,
      },
    ]);
    console.log(req.params.product_id);
    const product = await Product.findById(req.params.product_id).populate(
      "reviews"
    );

    const already_exiest = await product.reviews.find(
      (r) => r.user._id.toString() === req.user._id.toString()
    );
    if (already_exiest) {
      return res.status(400).send("you already review this product");
    }
    let pro = [...product.reviews];
    product.reviews.push(review_id);

    pro.push({ rating: rating });
    if (product.reviews.length === 1) {
      product.rating = rating * 1;
      product.Number_rating = 1;
    } else {
      product.Number_rating = product.reviews.length;
      product.rating =
        pro
          .map((item) => Number(item.rating))
          .reduce((sum, item) => sum + item, 0) / product.reviews.length;
    }
    await product.save();
    res.send(product);

    //  res.status(201).send("review is creates");
  } catch (err) {
    next(err);
  }
};

exports.getuser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id).select("-pass").orFail();
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.updateuser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id).orFail();
    user.name = req.body.name || user.name;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.isadmin = req.body.isadmin || user.isadmin;
    await user.save();
    res.send("user is updated");
  } catch (err) {
    next(err);
  }
};

exports.deleteuser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id).orFail();
    await user.deleteOne();
    res.send("user is deleted");
  } catch (err) {
    next(err);
  }
};

exports.restrectto = async (req, res, next) => {
  try {
    if (req.user.isadmin) {
      next();
    } else {
      return res.status(401).send("you are not admin");
    }
  } catch (err) {
    next(err);
  }
};
