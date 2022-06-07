import { IPeople } from './../interfaces/IPeople';
import { IBook } from './../interfaces/IBook';
import { IResolvers } from '@graphql-tools/utils';
import data from '../data';


const mutationResolvers: IResolvers = {
    Mutation : { // se debe especificar el tipo de raiz mutation para que el api entienda 

       /*
         addBook(id: ID!): Boolean
        updateBook(id: ID!): Boolean
        deleteBook(id: ID!): Boolean
       */

        addBook: (_: void,args:{book: IBook}) : {
            status: boolean,
            message: string,
            item?: IBook // No siempre se va devolver un item de tipo IBook porque pueden pasar errores
        } => { // leer los datos de entrada 
            // el objeto args es el que trae los valores ingresados por el playground o por la interfaz donde
            // se meten los datos del cliente
            
            // validar que el libro existe por titulo o isbn 

            const found = data.books.filter(
                value => value.title === args.book.title 
            )[0];

            if(found) {

                return {
                    message: `El libro ${args.book.title} ya existe`,
                    status: false
                };
            }

            const id = +data.books[data.books.length - 1].id + 1; // al agregar el simbolo mas a un string de numeros,

            args.book.id = id.toString();
            (data.books as IBook[]).push(args.book); // tipar el data.book como un array de tipo IBook para poder agregar el nuevo libro.
            // se tipa de esa forma porque la fuente de datos es un archivo json donde no está especificado los tipos de campos
            // el string de numeros se convierte en un valor de tipo numerico, y se podrian hacer operaciones
           

            return {
                status: true,
                message: "Nuevo libro agregado correctamente",
                item: args.book
            };
        },

        updateBook: (_: void, args: {book: IBook}):{
            status: boolean,
            message: string,
            item?: IBook // No siempre se va devolver un item de tipo IBook porque pueden pasar errores
        } => {
            
            let found = null;
            for (let i = 0; i < data.books.length; i++) {
              
                if(data.books[i].id === args.book.id) {
                    found = (data.books[i] as IBook) = args.book; // parsear la informacion y al mismo tiempo actualizar un objeto de
                    // el array de IBook
                break;// evitar que itere en todo el array cuando encuentre el objeto
              } 
            }
            if(!found) {

                return {
                    message: `Está intentando actualizar un libro que no existe`,
                    status: false
                };
            }

            return {

                status: true,
                message: `El libro ${args.book.title} se ha actualizado correctamente`,
                item: found
            };
        } ,
        deleteBook: (_: void, args: {id: string}):{
            status: boolean,
            message: string,
            item?: IBook // No siempre se va devolver un item de tipo IBook porque pueden pasar errores
        } => {

            let found = null;
            for (let i = 0; i < data.books.length; i++) {
              
                if(data.books[i].id === args.id) {
                    found = data.books[i];
                    //delete data.books[i]; // borrar el libro
                break;// evitar que itere en todo el array cuando encuentre el objeto
              } 
            }

            if(!found) {
                return  {
                    status: false,
                    message: `Èl libro con ID ${args.id} no existe`
                };
            }

            data.books = data.books.filter(

                (value) => value.id !== args.id
            );           

            return  {
                status: true,
                message: "Se ha borrado el libro",
                item: found
            };
        },

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