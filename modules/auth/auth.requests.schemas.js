const Joi = require('joi');
const bcrypt = require('bcryptjs');
const passwordComplexity = require('joi-password-complexity');

const passwordComplexityOptions = {
  min: 5,
  max: 24,
  lowerCase: 1,
  upperCase: 1,
  // numeric: 1,
  // symbol: 1,
  requirementCount: 4,
};

exports.loginSchema = Joi.object().keys({
  // lang: Joi.string().valid('en', 'ru', 'ge').min(2).max(2).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: passwordComplexity(passwordComplexityOptions).required(),
});

exports.emailValidationSchema = Joi.object().keys({
  email: Joi.string().min(5).max(255).required().email(),
});

exports.resetPasswordValidation = Joi.object().keys({
  password: passwordComplexity(passwordComplexityOptions).required(),
  passwordConfirm: passwordComplexity(passwordComplexityOptions).required(),
});

exports.updateMyPasswordValidation = Joi.object().keys({
  passwordCurrent: passwordComplexity(passwordComplexityOptions).required(),
  password: passwordComplexity(passwordComplexityOptions).required(),
  passwordConfirm: passwordComplexity(passwordComplexityOptions).required(),
});
