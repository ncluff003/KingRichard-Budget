////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const dotenv = require('dotenv');
const jwt = require(`jsonwebtoken`);

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Middleware
const crypto = require('crypto');
const multer = require('multer');
const sharp = require('sharp');

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`./../Utilities/catchAsync`);
const AppError = require(`./../Utilities/appError`);
const sendEmail = require(`./../Utilities/Email`);

////////////////////////////////////////////
//  Routing Middleware

////////////////////////////////////////////
//  My Modules
const Validate = require(`./../Models/validatorModel`);
const Calendar = require(`./../Utilities/Calendar`);
////////////////////////////////////////////
//  My Models
const User = require(`./../Models/userModel`);

////////////////////////////////////////////
//  My Functions

// const multerStorage = multer.diskStorage({
//   destination: (request, file, cb) => {
//     cb(null, './../../Public/DEST/CSS/Images/Users');
//   },
//   filename: (request, file, cb) => {
//     // Give User Photos A Unique Name
//     // user-user._id-current_time_stamp

//     const extension = file.mimetype.split('/')[1];
//     cb(null, `user-${request.user._id}-${Date.now()}.${extension}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (request, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError(`Not an image, please only upload images`, 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const createAndSendToken = (user, statusCode, method, request, response, template, title, optionalData, status, message) => {
  const token = signToken(user.id);
  if (method === `json`) {
    return response.status(statusCode).json({
      status: `${status}`,
      message: `${message}`,
    });
  }
  if (method === `render`) {
    return response.status(statusCode).render(`${template}`, {
      title: title,
      token,
      data: {
        user: user,
        ...optionalData,
      },
    });
  }
};

////////////////////////////////////////////
//  Exported Controllers

exports.searchForUser = catchAsync(async (request, response, next) => {
  const { username, password } = request.body;
  // Check if Username & Password Exist
  if (!username || !password) return next(new AppError(`Please provide username and password!`), 400);

  let user = await User.findOne({ username }).select('+password').select('+active');

  if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError(`Incorrect username or password`), 401);

  response.status(200).json({
    status: `Success`,
    data: {
      user: user,
    },
  });
});

exports.getMe = catchAsync(async (request, response, next) => {
  const user = await User.findById(request.user._id);
  const userInfo = [user.communicationPreference, user.latterDaySaint];
  response.status(200).json({
    status: `Success`,
    data: {
      user: user,
      userInfo: userInfo,
    },
  });
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (request, response, next) => {
  if (!request.file) return next();

  request.file.filename = `user-${request.user._id}-${Date.now()}.jpeg`;

  sharp(request.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`Public/DIST/CSS/Images/Users/${request.file.filename}`);

  next();
};

exports.updateMe = catchAsync(async (request, response, next) => {
  console.log('----------------------------------------------------------------');
  console.log(request.body);
  console.log('----------------------------------------------------------------');
  console.log('----------------------------------------------------------------');
  console.log(request.file);
  console.log('----------------------------------------------------------------');
  // CREATE ERROR IF USER TRIES TO POST PASSWORD DATA
  if (request.body.password || request.body.passwordConfirmed) {
    return next(new AppError(`This route is not for password updates.  Please use /updateMyPassword route.`, 400));
  }
  // UPDATE USER DOCUMENT
  const filteredBody = filterObj(
    request.body,
    'firstname',
    'lastname',
    'username',
    'email',
    'emailConfirmed',
    'phoneNumber',
    'phoneNumberConfirmed',
    'communicationPreference',
    'photo',
    'latterDaySaint',
    'form'
  );

  // IF A USER UPLOADS A PHOTO IT SHOULD BE REFLECTED IN THE USER'S PHOTO ON THE DATABASE, WHICH IN TURN SHOULD REFLECT IN THE REST OF THE BUDGET WHEN THE USER IS LOGGED IN.
  if (request.file) filteredBody.photo = request.file.filename;
  const updatedUser = await User.findByIdAndUpdate(request.user.id, filteredBody, { new: true, runValidators: true });
  createAndSendToken(updatedUser, 200, `render`, request, response, `loggedIn`, `King Richard | Home`, { calendar: Calendar });
});

exports.deactivateMe = catchAsync(async (request, response, next) => {
  await User.findByIdAndUpdate(request.user.id, { active: false });
  response.status(204).render(`base`, {
    title: `King Richard`,
    status: `Success`,
    data: null,
  });
});

exports.deleteMe = catchAsync(async (request, response, next) => {
  await User.findByIdAndDelete(request.user.id);
  response.status(204).json({
    status: 'Success',
    message: 'Deleted',
  });
});
