import { mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";

/*
import mutationResolvers from "./mutation";
import queryResolvers from "./query";
import typesResolvers from "./types";


const resolverIndex =  { // todos los resolvers se deben llamar aquí para centralizar el objeto de resolvers

    ...queryResolvers,
    ...typesResolvers, // este resvolver lo uso para identificar datos de tipo union
    ...mutationResolvers
};*/

// cada vez que se cargue un resolver de tipo ts o js se va cargar y fusionar automaticamente

const resolverArray = loadFilesSync(path.join(__dirname), {
  extensions: ["ts", "js"],
}); // carga todos los ficheros de extension ts y js excepto el archivo de entrada index

const resolversIndex =  mergeResolvers(resolverArray);
export default resolversIndex;
