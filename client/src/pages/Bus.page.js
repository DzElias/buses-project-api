import { BusesContext } from "../contexts/buses.context";
import { StopsContext } from "../contexts/stops.context";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { socket } from '../socket';

export default function Bus() {
    const navigate = useNavigate();

    const [updatedBus, setUpdatedBus] = useState({
    });

    

    const { getBusById } = useContext(BusesContext);
    const { getStopById } = useContext(StopsContext);
    const { id } = useParams();
    const bus = getBusById(id.replace(":", " ").trim());

    useEffect(() => {
      
      const stops = bus.stops;
      if(bus.isActive){
        setUpdatedBus({isActive: true});
      }
      setUpdatedBus({stops: stops})
    }, []);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("updateBus", {id: bus._id, updatedBus: updatedBus});
        setUpdatedBus({});
        navigate(-1);
    };

    const handleChange = (e) => {
        if(e.target.name.split(',')[0] == "change-stop"){
          var index = e.target.name.split(',')[1];
          var stops = updatedBus.stops ? [...updatedBus.stops] : [...bus.stops];
          
          stops[index] = e.target.value;
          
          var stopExist = getStopById(e.target.value); 
          
          
          if(stopExist){
            setUpdatedBus({ ...updatedBus, ['stops']: stops });
            console.log("updateBus.stops["+ index + "]" + updatedBus.stops[index]);
            e.target.value = "";
          };

        }else if(e.target.name == 'add-to-stops'){
          var stops = updatedBus.stops ? [...updatedBus.stops] : [...bus.stops]; 

          stops.push(e.target.value);
          var stopExist = getStopById(e.target.value);

          if(stopExist){setUpdatedBus({ ...updatedBus, ['stops']: stops })};

        }else if(e.target.name == "delete-stop"){
          var stops = updatedBus.stops ? [...updatedBus.stops] : [...bus.stops];
          var i = stops.indexOf(e.target.key);
          stops.splice(i, 1);
          setUpdatedBus({...updatedBus, ['stops']: stops })
        }else if (e.target.name == "isActive"){
          setUpdatedBus({ ...updatedBus, [e.target.name]: e.target.checked });
        }else{
          setUpdatedBus({ ...updatedBus, [e.target.name]: e.target.value });
        }
    };


    return (
        <>
        <button className="btn btn-dark p-10" onClick={() => navigate(-1)}>
          Volver
        </button>
        
        <div className="flex justify-center items-center">
        <div className="bg-white w-2/5 p-6 rounded">
          <h1 className="text-2xl text-center">Id del bus: {bus._id}</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <lable className="block">Numero de coche</lable>
            <input
              name="num"
              value={updatedBus.num}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={bus.num}
            />
            <br />

            <lable className="block">Linea</lable>
            <input
              name="line"
              value={updatedBus.line}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={bus.line}
            />
            
            <br />

            <lable className="block">Empresa</lable>
            <input
              name="company"
              value={updatedBus.company}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={bus.company}
            />
            <br />

            <lable className="block">Ruta-Itinerario (Polyline)</lable>
            <input
              name="ruta"
              value={updatedBus.ruta}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={bus.ruta}
            />
            <br />

            <lable className="block">Paradas</lable>
             <tbody>
               {updatedBus.stops ? updatedBus.stops.map((stopId, index) => {
                var stop = getStopById(stopId);
                var inputName = "change-stop," + index;
                return (
                  <tr key={stop._id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {index + 1}: 
                      </Typography>

                      <input
                        key={index}
                        name={inputName}
                        onChange={handleChange}
                        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder={stop.title}
                      />

                      <input 
                        key={stop._id}
                        name="delete-stop"
                        value="Eliminar Parada"
                        onClick={handleChange}
                      />

                    </td>
                  </tr>
                  
                )
              }): () => {}} 
              <tr key='new-stop'>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {updatedBus.stops ? updatedBus.stops.length + 1 : 2}:
                      </Typography>

                      <input
                        name="add-to-stops"
                        onChange={handleChange}
                        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder='Ingresar id de la nueva parada'
                      />

                      

                    </td>
                  </tr>
            </tbody>
            <br />
            {/* <input
              name="stops"
              value={updatedBus.stops}
              onChange={handleChange}
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder={bus.stops.toString().replaceAll("[", "").replaceAll("]", "")}
            />
            <br /> */}

            <lable className="block">El bus se encuentra en actividad</lable>
            <input className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 " name="isActive" type="checkbox" checked={updatedBus.isActive} onChange={handleChange}/>            
            <br/>



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