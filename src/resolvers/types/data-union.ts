import { IResolvers } from "@graphql-tools/utils"; // interfaz que se debe usar para dar tipado al objeto de los resolvers
import data from "../../data";

const typesResolvers: IResolvers = { // siempre respetar la estructura para separar los types en diferentes archivos
  // el resolver types lo utilizo para generar respuestas donde un type sea de diferentes interfaces
  // por ejemplo union  Data = Book | People

  Data: {
    // se debe llamar igual al nombre del campo union
    __resolveType(obj: { isbn: string; name: string }) {
      /*  
            Se agregan campos unicos de las entidades para preguntar cual de esos campos existe y asi saber que tipo de dato voy a 
            consultar y devolver       
        */
// el campo isbn se evalua para saber si viene y así saber cual type está consultando
      if (obj.isbn) {
        return "Book"; // retornar el type que se va consultar
      }

      if (obj.name) {
        return "People";
      }
    },
  },
};

export default typesResolvers;

// fijarse en el archivo schema.graphql para ver como se llaman las propiedades y tipos
