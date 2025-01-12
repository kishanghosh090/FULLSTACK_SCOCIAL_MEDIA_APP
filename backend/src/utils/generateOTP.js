import otpGenerator from "otp-generator";
const generateOTP = () => {
  return otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: true,
  });
};

export default generateOTP;
