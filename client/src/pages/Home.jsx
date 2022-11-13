import AddClientModal from "../components/clients/addclient/AddClientModal";
import AddProjectModal from "../components/projects/addproject/AddProjectModal";
import Projects from "../components/projects/Projects";
import Clients from "../components/clients/Clients";


export default function Home() {
    return (
        <>
            <div className='d-flex gap-4 mb-4'>
                <AddClientModal/>
                <AddProjectModal/>
            </div>
            <Projects/>
            <hr style={{color: "#df3ca6"}}/>
            <Clients/>
        </>
    );
}
