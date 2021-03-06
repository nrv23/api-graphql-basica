"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const schema_1 = __importDefault(require("./schema"));
const graphqlServer = new server_1.default(schema_1.default);
graphqlServer.listen((port) => {
    console.log(`Servidor corriendo en puerto ${port}`);
    console.log(`http://localhost:${port}/graphql`);
});
