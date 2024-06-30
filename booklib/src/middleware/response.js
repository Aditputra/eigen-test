const responseData = (_req, res, next) => {
  res.respond = (data) => {
    res.status(data.statusCode).send(data);
  };
  next();
};

module.exports = { responseData };
