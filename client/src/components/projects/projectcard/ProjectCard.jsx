export default function ProjectCard({project}) {
    return (
        <div className='col-md-4'>
            <div className='card mb-3' >
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center' style={{padding: "0 1.5rem"}}>
                        <h5 className='card-title'>{project?.name}</h5>
                        <a className='btn btn-secondary' href={`/projects/${project?.id
                        }`} style={{padding:"0.5rem 1.5rem"}}>
                            View
                        </a>
                    </div>
                    <p className='small' style={{padding: "0 1.5rem"}}>
                        Status: <strong>{project?.status}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
