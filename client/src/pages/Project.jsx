import {Link, useParams} from 'react-router-dom';
import Spinner from '../components/spinner/Spinner';
import ClientInfo from '../components/clients/clientinfo/ClientInfo';
import DeleteProjectButton from '../components/projects/deleteproject/DeleteProjectButton';
import EditProjectForm from '../components/projects/editproject/EditProjectForm';
import {useQuery} from '@apollo/client';
import {GET_PROJECT} from '../queries/projectQueries';
import {FaEnvelope, FaIdBadge, FaPhone} from "react-icons/fa";
import {GET_CLIENT_BY_ID} from "../queries/clientQueries";

export default function Project() {
    const {id} = useParams();
    const {loading, error, data} = useQuery(GET_PROJECT, {variables: {id}});
    console.log(data)

    if (loading) return <Spinner/>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <>
            {!loading && !error && (
                <div className='mx-auto w-75 card p-5' style={{border: "1px solid #df3ca6"}}>
                    <Link to='/' className='btn btn-secondary btn-sm w-25 d-inline ms-auto'>
                        Back
                    </Link>
                    <DeleteProjectButton projectId={data.project.id}/>

                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>

                    <h5 className='mt-3'>Project Status</h5>
                    <p className='lead'>{data.project.status}</p>

                    <hr style={{color:"#df3ca6"}}/>

                    <h5 className='mt-5'>Client Information</h5>
                    <p>{data?.project?.status}</p>
                    <ClientInfo client={data.project.client}/>

                    <EditProjectForm project={data.project}/>


                </div>
            )}
        </>
    );
}