export const schemaChecker = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};