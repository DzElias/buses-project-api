import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { socket } from '../socket';
   
  export default function NewDriver() {
    const navigate = useNavigate();

    const [newDriver, setnewDriver] = useState({
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if(newDriver.ci && newDriver.name && newDriver.busId){
        socket.emit("newDriver", newDriver);
        setnewDriver({});
        navigate(-1);
      }
      
    };

    const handleChange = (e) => {
      setnewDriver({ ...newDriver, [e.target.name]: e.target.value });
    };

    
  

    return (
        <>
        <button className="btn btn-dark p-10" onClick={() => navigate(-1)}>
          Volver
        </button>
        
        <div className="flex justify-center items-center">
        <div className="bg-white w-2/5 p-6 rounded">
          <h1 className="text-2xl text-center">Agregar Chofer</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <lable className="block">Numero de cedula</lable>
            <input
              name="ci"
              value={newDriver.ci}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="1234567"
            />
            <br />

            <lable className="block">Nombre completo</lable>
            <input
              name="name"
              value={newDriver.name}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Juan Gonzalez"
            />
            
            <br />

            <lable className="block">Id del Bus</lable>
            <input
              name="busId"
              value={newDriver.busId}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Un id valido"
            />
            <br />
            <button className="px-10 py-2 text-md text-white bg-gray-700 rounded">
              Enviar
            </button>
          </form>
        </div>
      </div>
      </>
    );
  }