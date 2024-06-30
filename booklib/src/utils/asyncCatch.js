const asyncCatch = (requestHandler) => {
  return async (req, res, next) => {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      console.log("eerr >>", error);
      next(error);
    }
  };
};

module.exports = asyncCatch;
