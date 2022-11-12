import {FaTrash} from 'react-icons/fa';
import {useMutation} from '@apollo/client';
import {DELETE_CLIENT} from '../../../mutations/clientMutations';
import {GET_CLIENTS} from '../../../queries/clientQueries';
import {GET_PROJECTS} from '../../../queries/projectQueries';

export default function ClientRow({client}) {
    // In this const useMutation hook is used to make a mutation to the API
    // In order to keep the UI updated, we should either:
    //
    // 1: refecth the getAll query
    // EX: refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}]
    //
    // 2: overwrite the cache
    // EX: update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}]
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className='btn btn-danger btn-sm' onClick={deleteClient}>
                    <FaTrash/>
                </button>
            </td>
        </tr>
    );
}
