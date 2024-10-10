const INVALID_ALPHANUMERIC = "Kindly input a valid alphanumeric.";
const INVALID_NAME = "Kindly input a valid name.";
const INVALID_NUMBER = "Kindly input a valid number.";
const INVALID_POST_CODE = "Kindly input a valid post code.";
const INVALID_STRING = "Kindly input a valid text.";
const INVESTMENT_INVALID_EMAIL = "The email you have entered is invalid.";
const LOGIN_INVALID_OTP = "Invalid OTP. Please try again.";
const OCR_INVALID_NRIC_DATA = "We’re unable to capture the data from the image you uploaded.";
const PASSWORD_NOT_MATCH = "Those passwords didn't match. Try again.";
const CHECK_WRONG_PASSWORD = "Invalid password entered. Please try again.";
const SIMILAR_PASSWORD = "New password entered is the same as current password.";

export const ERROR = {
  INVALID_ALPHANUMERIC,
  INVALID_NAME,
  INVALID_NUMBER,
  INVALID_POST_CODE,
  INVALID_STRING,
  INVESTMENT_INVALID_EMAIL,
  LOGIN_INVALID_OTP,
  OCR_INVALID_NRIC_DATA,
  PASSWORD_NOT_MATCH,
  CHECK_WRONG_PASSWORD,
  SIMILAR_PASSWORD,
};

export const ERROR_CODE = {
  lockedAccount: "EM001",
  otpAttempt: "EM002",
  invalidNric: "EM011",
  invalidNricData: "EM012",
  invalidNricFormat: "EM408",
  clientAgeMinimum: "EM600",
  clientAgeMaximum: "EM601",
  clientBannedCountry: "EM602",
  internal: "OMNI400",
  unauthenticated: "OMNI401",
  network: "OMNI402",
  storage: "OMNI403",
  submittedPdf: "EM448",
  currentPassword: "EM403",
  duplicateLogin: "EM011",
  nativeException: "R004",
  jsException: "R005",
};
