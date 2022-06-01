import { useParams } from "react-router-dom";

const Registered = () => {
    const params = useParams()
    return <div className="container">
        <h2>Registrado</h2>

        <p>teamID: {params.teamID}</p>    
    </div>;
};

export default Registered;
