import { BusesContext } from "../contexts/buses.context";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from '../socket';

export default function NewBus() {
    const navigate = useNavigate();

    const [newBus, setnewBus] = useState({
    });

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(newBus.line && newBus.stops && newBus.num && newBus.ruta && newBus.company){
            socket.emit("newBus", newBus);
            setnewBus({});
            navigate(-1);
        }
    };

    const handleChange = (e) => {
        setnewBus({ ...newBus, [e.target.name]: e.target.value });
    };

    return (
        <>
        <button className="btn btn-dark p-10" onClick={() => navigate(-1)}>
          Volver
        </button>
        
        <div className="flex justify-center items-center">
        <div className="bg-white w-2/5 p-6 rounded">
          <h1 className="text-2xl text-center">Agregar Bus</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <lable className="block">Numero de coche</lable>
            <input
              name="num"
              value={newBus.num}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="01"
            />
            <br />

            <lable className="block">Linea</lable>
            <input
              name="line"
              value={newBus.line}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="10"
            />
            
            <br />

            <lable className="block">Empresa</lable>
            <input
              name="company"
              value={newBus.company}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Buses S.A"
            />
            <br />

            <lable className="block">Ruta-Itinerario (Polyline)</lable>
            <input
              name="ruta"
              value={newBus.ruta}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="%fdsafa#33/2#@3"
            />
            <br />

            <lable className="block">Paradas</lable>
            <input
              name="stops"
              value={newBus.stops}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="ID Parada 1, ID Parada 2, ID parada 3, ..."
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

    // company: String,
    // line: String,
    // stops: Array,
    // nextStop: String,
    // latitude: Number,
    // longitude: Number,
    // ruta: String,
    // num: String,
    // actualDriver: String,
    // isActive: Boolean,


}