import { IBook } from "./../interfaces/IBook";
import { IResolvers } from "@graphql-tools/utils"; // interfaz que se debe usar para dar tipado al objeto de los resolvers
import data from "../data";
import { IPeople } from "./../interfaces/IPeople";

const queryResolvers: IResolvers = { 
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

    peopleNumber: () => 1231231,
    booksList: (): { // interfaz que devuelve
      status: boolean,
      message: string,
      list: Array<IBook>
    } => {
      return {
        status: true,
        message: "Lista de libros correctamente cargada",
        list: data.books
      };
    },
    peopleList: ():  { // interfaz que devuelve
      status: boolean,
      message: string,
      list: Array<IPeople> 
    } => {
      return {
        status: true,
        message: "Lista de personas cargada correctamente",
        list: data.people
      };
    },

    getBook: (_: void, args: { id: string }): { // interfaz que devuelve
      status: boolean,
      message: string,
      item?: IBook
    } => {

      const libro = data.books.filter(({ id }) => id === args.id)[0];
    
      return {
        status: typeof libro === 'undefined'? false: true,
        message: typeof libro === 'undefined'? 'Sin resultados': 'Libro encontrado',
        item: libro
      };
    },

    getPerson: (_: void, args: { id: string }): { // interfaz que devuelve
      status: boolean,
      message: string,
      item?: IPeople
    }  => {
      const found =  data.people.filter(({ id }) => id === args.id)[0];

      return {
        status: typeof found === 'undefined'? false: true,
        message: typeof found === 'undefined'? 'Sin resultados': 'Persona encontrada',
        item: found
      };
    },
  },
};
// fijarse en el archivo schema.graphql para ver como se llaman las propiedades y tipos
export default queryResolvers;
