import { IResolvers } from "@graphql-tools/utils"; // interfaz que se debe usar para dar tipado al objeto de los resolvers
import data from "../../data";
import { IPeople } from "../../interfaces/IPeople";

const queryPeopleResolvers: IResolvers = {  // esta estructura siempre se tiene que respetar al separar
    // querys, mutations y subscription
  Query: {
    
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
export default queryPeopleResolvers;
