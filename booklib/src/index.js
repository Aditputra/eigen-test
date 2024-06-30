const connectDB = require("./config/database");
const server = require("./server");

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
