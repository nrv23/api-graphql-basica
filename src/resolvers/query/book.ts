import { IResolvers } from "@graphql-tools/utils"; // interfaz que se debe usar para dar tipado al objeto de los resolvers
import { IBook } from "../../interfaces/IBook";
import data from "../../data";

const queryBookResolvers: IResolvers = { // esta estructura siempre se tiene que respetar al separar
    // querys, mutations y subscription
  Query: {
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
      },getBook: (_: void, args: { id: string }): { // interfaz que devuelve
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
    },
};
// fijarse en el archivo schema.graphql para ver como se llaman las propiedades y tipos
export default queryBookResolvers;
