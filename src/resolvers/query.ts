import {IResolvers} from '@graphql-tools/utils'

const queryResolvers: IResolvers = {
    Query: {
      hello: (): string => "Hola a la api de graphql",
      helloWithName: (
        _: void,
        args: { name: string },
        context: any,
        info: object
      ): string => {
        // argumentos
        /*
            el objeto args son los parametros que se envian,
            contexto es el contexto del resolver,
            info, la informacion que puede ser compartida
        */
        console.log({ info });
        console.log({ context });
        return `Hola ${args.name}`;
      },

      peopleNumber: () => 1231231,
    },
  };

  export default queryResolvers;