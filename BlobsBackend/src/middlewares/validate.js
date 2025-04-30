const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) return res.status(400).json({ message: error.details });
  next();
};

module.exports = validate;
