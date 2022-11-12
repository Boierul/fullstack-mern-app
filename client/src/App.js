import Header from "./components/header/Header";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Clients from "./components/clients/Clients";

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Header/>
                <Clients />
            </ApolloProvider>
        </>
    );
}

export default App;
