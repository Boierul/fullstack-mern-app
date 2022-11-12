import {useQuery} from '@apollo/client';
import ClientRow from '../clients/clientrow/ClientRow';
import Spinner from '../spinner/Spinner';
import {GET_CLIENTS} from '../../queries/clientQueries';
import './Clients.css'

export default function Clients() {
    const {loading, error, data} = useQuery(GET_CLIENTS);

    if (loading) return <Spinner/>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <div className="clients-list">
            <h1 className="client-list-header">List of current clients</h1>
            {!loading && !error && (
                <table className='clients-the-list'>
                    <caption className='clients-the-list-caption'>List of clients</caption>
                    <thead className='thead-container'>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.clients.map((client) => (
                        <ClientRow key={client.id} client={client}/>
                    ))}
                    </tbody>
                </table>

            )}
        </div>
    );
}
