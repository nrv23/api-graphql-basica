import { IResolvers } from "@graphql-tools/utils"; // interfaz que se debe usar para dar tipado al objeto de los resolvers
import data from "../../data";

const typesResolvers: IResolvers = {
  // el resolver types lo utilizo para generar respuestas donde un type sea de diferentes interfaces
  // por ejemplo union  Data = Book | People

  People: {
    // indicar a cual type voy a consultar
    booksBuy: (root: { books: Array<string> }) => {
      // devuelve la propiedad con el tipo de dato personalizado, en este caso people
      return data.books.filter((book) => root.books.indexOf(book.id) > -1); // busca que exista el id en alguno de los elementos del root.books
      // y que su resultado sea mayor a -1
    },
    // Valores que son opcionales
    website: (root: { website?: string }) => {
      return !root.website ? "" : root.website;
    },
    github: (root: { github?: string }) => {
      return !root.github ? "" : root.github;
    },

    twitter: (root: { twitter?: string }) => {
      return !root.twitter ? "" : root.twitter;
    },
  },
};

export default typesResolvers;

// fijarse en el archivo schema.graphql para ver como se llaman las propiedades y tipos
