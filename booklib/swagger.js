const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "BookLib API",
    description: "Documentation All API",
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Book",
      description: "Endpoints Book",
    },
    {
      name: "Member",
      description: "Endpoints Member",
    },
    {
      name: "Book Member",
      description: "Endpoints Book Member",
    },
  ],
  definitions: {
    createBook: {
      $code: "NRN-7",
      $title: "The Lion, the Witch and the Wardrobe",
      $author: "C.S. Lewis",
      $stock: 1,
    },
    createMember: {
      $code: "M001",
      $name: "Angga",
    },
    createBookMember: {
      $memberId: "668165d742da535d6b0805f4",
      $bookId: "668169dd241e92812f357667",
    },
    updateBookMember: {
      $memberId: "66818f687a6bf904fa1d2206",
      $bookId: "66816a04241e92812f357669",
      $returnDate: "2024-07-10",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
