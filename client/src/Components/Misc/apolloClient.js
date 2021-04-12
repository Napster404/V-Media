import ApolloClient from 'apollo-boost';

export default new ApolloClient({
    // cache: new InMemoryCache(),
    uri: "http://localhost:8000/graphql"
});