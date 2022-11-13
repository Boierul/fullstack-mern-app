import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
// import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import Header from "./components/header/Header";
import Project from "./pages/Project";

// Implemented in order to save the changes during UX
// const cache = new InMemoryCache({
//     typePolicies: {
//         Query: {
//             fields: {
//                 clients: {
//                     merge(existing, incoming) {
//                         return incoming;
//                     },
//                 },
//                 projects: {
//                     merge(existing, incoming) {
//                         return incoming;
//                     },
//                 },
//             },
//         },
//     },
// });

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Router>
                    <Header/>
                    {/* maybe delete the div to fill the screen */}
                    <div className='container container-xxl'>
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/projects/:id' element={<Project />} />
                            <Route path='*' element={<NotFound/>}/>
                        </Routes>
                    </div>
                </Router>
            </ApolloProvider>
        </>
    );
}

export default App;
