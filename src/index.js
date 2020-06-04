const {ApolloServer, gql } = require('apollo-server');
const {importSchema} = require('graphql-import');
const resolvers = require('./resolvers')

const server = new ApolloServer({
    typeDefs: importSchema('./src/schema/index.graphql'),
    resolvers
})

server.listen(3333).then(({ url }) => {
    console.log(`Executando a URL: ${url}`)
})