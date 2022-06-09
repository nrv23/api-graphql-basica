import { IPeople } from '../../interfaces/IPeople';
import { IResolvers } from '@graphql-tools/utils';
import data from '../../data';


const mutationResolvers: IResolvers = {
    Mutation : { // se debe especificar el tipo de raiz mutation para que el api entienda 
        // mutations para modulo people


        addPerson: (_: void, args:{person: IPeople}): {
            status: boolean,
            message: string,
            item?: IPeople // No siempre se va devolver un item de tipo IBook porque pueden pasar errores
        } => {

            const found = data.people.filter( 

                person =>  person.name === args.person.name

            )[0];

            if(found) {
                return  {
                    status: false,
                    message: `La persona con nombre ${args.person.name} ya existe`
                };
            }

            
            const id = +data.people[data.people.length - 1].id + 1; // al agregar el simbolo mas a un string de numeros,

            args.person.id = id.toString();
            (data.people as IPeople[]).push(args.person); // tipar el data.book como un array de tipo IBook para poder agregar el nuevo libro.
            // se tipa de esa forma porque la fuente de datos es un archivo json donde no está especificado los tipos de campos
            // el string de numeros se convierte en un valor de tipo numerico, y se podrian hacer operaciones

            return  {
                status: true,
                message: "Se ha agregado correctamente",
                item: args.person
            };
        },
        updatePerson: (_: void, args: {person: IPeople}): {
            status: boolean,
            message: string,
            item?: IPeople // No siempre se va devolver un item de tipo IBook porque pueden pasar errores
        } => {

            let found = null; 
                
            for(let i = 0; i < data.people.length; i++) {
                if(data.people[i].id === args.person.id) {
                    found = (data.people[i] as IPeople) = args.person; 
                    break;
                }
            }

            if(!found) {
                return  {
                    status: false,
                    message: `La persona con id ${args.person.id} no existe`
                };
            }
            
            return {
                status: true,
                message: "Se ha actualizado correctamente",
                item: found
            };
        },

        deletePerson: (_: void, args: {id: string}): {
            status: boolean,
            message: string,
            item?: IPeople // No siempre se va devolver un item de tipo IBook porque pueden pasar errores
        }=> {

            const deleted = data.people.filter(
                person => person.id !== args.id 
            );


            if(deleted.length > 0 && deleted.length < data.people.length) {

                data.people = deleted;

                return {
                    status: true,
                    message: "Se ha borrado correctamente"
                };
            } else {

                return {
                    status: false,
                    message: `No se encontró una persona con el id ${args.id}`
                };
            }
        }
    }
};

export default mutationResolvers;

/*
    Todas las peticiones de tipo graphql se trabajan como verbos de tipo post. Siempre se va enviar un body 
    para eliminar, obtener, actualizar o agregar datos en la api
*/