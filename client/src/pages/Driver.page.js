import { DriversContext } from "../contexts/drivers.context";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from '../socket';
   
  export default function Driver() {
    const navigate = useNavigate();

    const [updatedDriver, setUpdatedDriver] = useState({
    });

    const { getDriverById } = useContext(DriversContext);
    const { id } = useParams();
    const driver = getDriverById(id.replace(":", " ").trim());

    const handleSubmit = (e) => {
      e.preventDefault();
      socket.emit("updateDriver", {id: driver._id, updatedDriver: updatedDriver});
      setUpdatedDriver({});
      navigate(-1);
      
    };

    const handleChange = (e) => {
      setUpdatedDriver({ ...updatedDriver, [e.target.name]: e.target.value });
    };

    
  

    return (
        <>
        <button className="btn btn-dark p-10" onClick={() => navigate(-1)}>
          Volver
        </button>
        
        <div className="flex justify-center items-center">
        <div className="bg-white w-2/5 p-6 rounded">
          <h1 className="text-2xl text-center">Id del chofer: {driver._id}</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <lable className="block">Numero de cedula</lable>
            <input
              name="ci"
              value={updatedDriver.ci}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={driver.ci}
            />
            <br />

            <lable className="block">Nombre completo</lable>
            <input
              name="name"
              value={updatedDriver.name}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={driver.name}
            />
            
            <br />

            <lable className="block">Id del Bus</lable>
            <input
              name="busId"
              value={updatedDriver.busId}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={driver.busId}
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