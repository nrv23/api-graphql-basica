import mutationResolvers from "./mutation";
import queryResolvers from "./query";
import typesResolvers from "./types";

const resolverIndex =  { // todos los resolvers se deben llamar aquí para centralizar el objeto de resolvers

    ...queryResolvers,
    ...typesResolvers, // este resvolver lo uso para identificar datos de tipo union
    ...mutationResolvers
};


export default resolverIndex;