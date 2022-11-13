import {useQuery} from '@apollo/client';
import ProjectCard from '../projects/projectcard/ProjectCard';
import {GET_PROJECTS} from '../../queries/projectQueries';
import './Projects.css'

export default function Projects() {
    const {loading,error, data} = useQuery(GET_PROJECTS);
    if (error) return <p>Something Went Wrong</p>;
    if (loading) return <p style={{color:"#df3ca6", textAlign: "center"}}>Data is loading</p>;

    return (
        <div className="projects-list">
            <h1 className="projects-list-header">List of available projects</h1>
            {data.projects.length > 0 ? (
                <div className='row mt-4'>
                    {data.projects.map((project) => (
                        <ProjectCard key={project?.id} project={project}/>
                    ))}
                </div>
            ) : (
                <p>No projects yet</p>
            )}
        </div>
    );
}
