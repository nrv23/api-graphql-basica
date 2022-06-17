import { IResolvers } from '@graphql-tools/utils';
import mutation from './mutation';
import query from './query';

export const LIST: string [] = [ ];
const resolvers : IResolvers = {
    ...query,
    ...mutation
};

export default resolvers;