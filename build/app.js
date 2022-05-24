"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const apollo_server_express_1 = require("apollo-server-express");
const app = (0, express_1.default)();
const typeDefs = (0, apollo_server_express_1.gql) `    
    type Query {
        hello: String!
        helloWithName(name: String!): String
        peopleNumber: Int!
    }
`;
app.use((0, compression_1.default)());
app.use("/", (_, res) => {
    res.json({ response: "Bienvenid@ al proyecto" });
});
const httpServer = (0, http_1.createServer)(app);
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Servidor http corriendo en puerto ${PORT}`);
});
