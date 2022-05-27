import queryResolvers from "./query";
import typesResolvers from "./types";

const resolverIndex =  {

    ...queryResolvers,
    ...typesResolvers // este resvolver lo uso para identificar datos de tipo union
}


export default resolverIndex;