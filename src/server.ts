import { ApolloServer, gql } from "apollo-server-express";
import compression from "compression";
import express, { Application } from "express"; //es el tipo de aplicacion para express
import { GraphQLSchema } from "graphql";
import { Server, createServer } from "http";

class GraphQLServer {
  //propiedades

  private app!: Application;
  private httpServer!: Server;
  private readonly DEFAULT_PORT: Number = 5000; // este campo se va leer solamente
  private schema!: GraphQLSchema;

  constructor(schema: GraphQLSchema) {

    if(schema === undefined) { // si el valor esqyema esta indefinido
        throw new Error("EL valor del schema de graphql es un valor requerido");
    }
    this.schema = schema;
    this.init();
  }

  private init() {
    this.configExpress();
    this.configApolloServerExpress();
    this.configRoutes();
  }

  private configExpress(): void {
    this.app = express();
    this.app.use(compression());
    this.httpServer = createServer(this.app);

  }

  private async configApolloServerExpress() {
    try {
     
      // crear el ejecutable del esquema

     
      const apolloServer = new ApolloServer({
        schema:this.schema,
        introspection: true,
      });

      await apolloServer.start();

      // configurar el servidor apollo server

      apolloServer.applyMiddleware({ app: this.app, cors: true }); // configurar el cors en apollo server
      /*
        si las propiedades de type Query llevan el simbolo ! quiere decir que tanto su argumento o su valor de retorno no puede ser nulos

        respetar nombres de propiedades de querys con resolvers, se deben llamar igual para evitar errores 
    */
      //resolvers
      //app.use(cors());
    } catch (error) {
        console.log({ error });
        process.exit(1); // si pasa un error detener la ejecución
    }
  }

  private configRoutes(): void {
    this.app.get("/hello", (_, res) => {
      res.json({ response: "Bienvenid@ al proyecto" });
    });

    this.app.get("/", (_, res) => {
      // habililitar mediante un endpoint de tipo rest, la ruta para consultas a la api de graphql
      res.redirect("/graphql");
    });
    //"nodemon \"src/app.ts\" --exec \"ts-node\" \"src/app.ts\" -e ts,graphql,json" ejecutar usando ts-node el archivo
    //app.ts y escuchar cambios en cualquier extension ts,graphql, json y se podrian meter mas opciones
    /*
              npx tsc -p . && ncp src/schema build/schema
      
              con ncp copiar todos los archivos de la carpeta esquema y pegarlos a la carpeta build/schema
              cuando se haga el proceso de crear el proyecto a produccion
      
              generar el archivo con opciones default tsconfig.json npx tsc --init 
          */
  }

  listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT, () => {
      callback(+this.DEFAULT_PORT);
    });
  }
}

export default GraphQLServer;
