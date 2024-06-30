const app = require("express")();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");
const bodyParser = require("express").json;
const routes = require("./routes");

const { responseData } = require("./middleware/response");
const { handleError } = require("./middleware/errors");
const { RouteNotFoundError } = require("./errors/customErrors");

app.use(cors());
app.use(bodyParser());
app.use(responseData);

app.use("/api/v1", routes);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
app.use(handleError);

module.exports = app;
