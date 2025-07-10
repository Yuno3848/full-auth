import mongoose from "mongoose";
import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/auth.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import { forgotPasswordMail, generateMail, sendMail } from "../utils/mail.js";
import cookie from "cookie-parser";
import bcrypt from "bcryptjs";

export const registeredUser = asyncHandler(async (req, res) => {
  const { username, fullname, password, email } = req.body;
  if (
    [username, fullname, password, email].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required...");
  }

  //check whether the same user already exists or not

  const isUser = await User.findOne({ email });
  if (isUser) {
    throw new ApiError(404, "User already created...", isUser);
  }

  //avatar

  if (!req.file) {
    throw new ApiError(400, "Image file is required.");
  }

  const imageUpload = await uploadOnCloudinary(req?.file?.path);
  if (!imageUpload) {
    throw new ApiError(500, "Image upload faild. Please try again.");
  }

  //create user
  const user = await User.create({
    fullname,
    username,
    email,
    password,
    avatar: {
      url: imageUpload.url,
      localPath: req.file?.path,
    },
  });

  //check any error while creating user
  if (!user) {
    throw new ApiError(500, "Something went wrong while creating user.");
  }

  //token
  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  //save token in the database

  user.emailVerifiedToken = hashedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;
  await user.save();

  //send mail
  await sendMail({
    username: user.username,
    email: user.email,
    subject: "user verification",
    mailGenContent: generateMail(
      user.username,
      `http://localhost:8000/api/v1/user/verify/${unhashedToken}`
    ),
  });

  res.status(201).json(new ApiResponse(201, "User created successfully", user));
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;
  if (!token || token.trim() === "") {
    throw new ApiError(400, "token is missing or invalid...");
  }

  const emailVerifiedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  //find user by token
  const user = await User.findOne({
    emailVerifiedToken,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(404, "User not found or token expired.");
  }
  user.isEmailVerified = true;
  user.emailVerifiedToken = undefined;
  user.emailVerificationTokenExpiry = undefined;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Email verified successfully", { user }));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields area required...");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user not found...");
  }

  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    throw new ApiError(401, "Invalid Password!");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  if (!accessToken || !refreshToken) {
    throw new ApiError(501, "Token generation failed...");
  }

  const accessCookieOptions = {
    httpOnly: true,

    maxAge: 24 * 60 * 60 * 1000,
  };

  const refreshCookieOptions = {
    httpOnly: true,

    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  };

  res
    .status(201)
    .cookie("accessToken", accessToken, accessCookieOptions)
    .cookie("refreshToken", refreshToken, refreshCookieOptions)
    .json(
      new ApiResponse(200, "user logged in successfully...", {
        _id: user._id,
        email: user.email,
        password: user.password,
        username: user.username,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie();
  return res
    .status(200)
    .json(new ApiResponse(200, "user logged out successfully..."));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Invalid Email...");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found..");
  }

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  await user.save();

  await sendMail({
    username: user.username,
    email: user.email,
    subject: "forgot password link",
    mailGenContent: forgotPasswordMail(
      user.username,
      `http://localhost:5173/api/v1/user/resetpassword/${unhashedToken}`
    ),
  });

  return res.status(200).json(
    new ApiResponse(200, "Password forgot successfully", {
      _id: user._id,
      email: user.email,
      password: user.password,
      username: user.username,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  if (!token) {
    throw new ApiError(400, "Invalid Token...");
  }
  if (!password || !confirmPassword) {
    throw new ApiError(400, "Both password fields are required.");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match.");
  }
  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOneAndUpdate(
    {
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    },
    {
      $set: {
        password,
        isEmailVerified: true,
        emailVerifiedToken: undefined,
        emailVerificationTokenExpiry: undefined,
      },
    },
    {
      new: true,
    }
  );

  if (!user) {
    throw new ApiError(404, "user or token not found...");
  }

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "password reset successfully...", user));
});
