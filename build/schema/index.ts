import "graphql-import-node"; // importar ese paquete para que no de problema cuando se importen archivos con extension graphql
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from "graphql";
import resolvers from '../resolvers'
import typeDefs from './schema.graphql';

 const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  export default schema;