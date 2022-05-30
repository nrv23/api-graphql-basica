import { IResolvers } from "@graphql-tools/utils"; // interfaz que se debe usar para dar tipado al objeto de los resolvers
import data from "../data";

const typesResolvers: IResolvers = {
  // el resolver types lo utilizo para generar respuestas donde un type sea de diferentes interfaces
  // por ejemplo union  Data = Book | People

  Data: {
    // se debe llamar igual al nombre del campo union
    __resolveType(obj: { isbn: string; name: string }) {
      /*  
            Se agregan campos unicos de las entidades para preguntar cual de esos campos existe y asi saber que tipo de dato voy a 
            consultar y devolver       
        */

      if (obj.isbn) {
        return "Book"; // retornar el type que se va consultar
      }

      if (obj.name) {
        return "People";
      }
    },
  },
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

  Book: {
    // root el root trae la informacion que viene del type, en este caso Book
    byPeopleBuy: (root: { id: string }) => {
      // devuelve datos de tipo Book, desestructura el id del libro

      return data.people.filter((p) => p.books.indexOf(root.id) > -1);
    },
    publishedDate: (root: { publishedDate?: string }) => {
      // aqui siempre va venir toda la informacion referente al type
      // en este caso es book

      // cuando llaman propiedades del type es para modificar el comportamiento a la hora de la consulta
      // en este caso como el campo  publishedDate de type Book no existe en todos los objetos del array books
      // entonces se modifica su salida, si existe devuelve el dato y sino devuelve string vacío

      if (!root.publishedDate) {
        return "";
      }

      return root.publishedDate;
    },
    thumbnailUrl: (root: { thumbnailUrl?: string }) => {
      if (!root.thumbnailUrl) {
        return "";
      }

      return root.thumbnailUrl;
    },
    shortDescription: (root: { shortDescription?: string }) => {
      if (!root.shortDescription) {
        return "";
      }

      return root.shortDescription;
    },

    longDescription: (root: { longDescription?: string }) => {
      return typeof root.longDescription === "undefined"
        ? ""
        : root.longDescription;
    },
  },
};

export default typesResolvers;

// fijarse en el archivo schema.graphql para ver como se llaman las propiedades y tipos
