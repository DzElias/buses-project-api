import { StopsContext } from "../contexts/stops.context";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from '../socket';
   
  export default function Stop() {
    const navigate = useNavigate();

    const [updatedStop, setUpdatedStop] = useState({
    });

    const { getStopById } = useContext(StopsContext);
    const { id } = useParams();
    const stop = getStopById(id.replace(":", " ").trim());

    const handleSubmit = (e) => {
      e.preventDefault();
      socket.emit("updateStop", {id: stop._id, updatedStop: updatedStop});
      setUpdatedStop({});
      navigate(-1);
      
    };

    const handleChange = (e) => {
      if(e.target.name == "latitude" || e.target.name == "longitude"){
        if(e.target.value != "-" || e.target.value == "."){
          setUpdatedStop({ ...updatedStop, [e.target.name]: parseFloat(e.target.value) });
        }
      }else{
      setUpdatedStop({ ...updatedStop, [e.target.name]: e.target.value });
    }};

    
  

    return (
        <>
        <button className="btn btn-dark p-10" onClick={() => navigate(-1)}>
          Volver
        </button>
        
        <div className="flex justify-center items-center">
        <div className="bg-white w-2/5 p-6 rounded">
          <h1 className="text-2xl text-center">Id de la Parada: {stop._id}</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <lable className="block">Nombre de la Parada</lable>
            <input
              name="title"
              value={updatedStop.title}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={stop.title}
            />
            <br />

            <lable className="block">Latitud</lable>
            <input
              name="latitude"
              value={updatedStop.latitude}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={stop.latitude}
            />
            
            <br />

            <lable className="block">Longitud</lable>
            <input
              name="longitude"
              value={updatedStop.longitude}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={stop.longitude}
            />
            <br />
            <button className="px-10 py-2 text-md text-white bg-gray-700 rounded">
              Guardar
            </button>
          </form>
        </div>
      </div>
      </>
    );
  }