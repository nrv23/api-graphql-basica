import { IResolvers } from "@graphql-tools/utils"; // interfaz que se debe usar para dar tipado al objeto de los resolvers


const queryBasicResolvers: IResolvers = { 
  Query: {
    hello: (): string => "Hola a la api de graphql",
    helloWithName: (
      _: void,
      args: { name: string },
      context: unknown,
      info: unknown
    ): string => {
      // argumentos
      /*
            el objeto args son los parametros que se reciben,
            contexto es el contexto del resolver,
            info, la informacion que puede ser compartida
        */
      console.log({ info });
      console.log({ context });
      return `Hola ${args.name}`;
    },

    peopleNumber: () => 1231231
    },
};
// fijarse en el archivo schema.graphql para ver como se llaman las propiedades y tipos
export default queryBasicResolvers;
