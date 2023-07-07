import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { useContext} from "react";
import { StopsContext } from "../contexts/stops.context";

import { socket } from "../socket";

 

const TABLE_HEAD = ["Id", "Nombre", "Lat", "Long"];
 
export default function Stops() {
  const navigate = useNavigate();

  const { getStops } = useContext(StopsContext);
  
  const stops = getStops();

  const redirect = (id) => {
    navigate( "/stops/:" + id);
  };

  const deleteStop = (id) => {
    socket.emit("deleteStop", {id: id});
  }

  return (
    
    <>
    <div class="flex justify-between">
    <button className="btn btn-dark p-10" onClick={() => navigate(-1)}>
          Volver
    </button>

    
    <button className="btn p-10 text-lg" onClick={() => navigate("/stops/new")}>
      Agregar Parada 
    </button>
    
    </div>
    <Card className="overflow-scroll h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stops.map(({ _id, title, latitude, longitude }, index) => {
            const isLast = index === stops.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={_id}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {_id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {latitude}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {longitude}
                  </Typography>
                </td>
                <td className={classes} onClick={() => redirect(_id)}>
                  <Typography variant="small" color="blue" className="font-medium">
                    Editar
                  </Typography>
                </td>
                <td className={classes} onClick={() => deleteStop(_id)}>
                  <Typography variant="small" color="blue" className="font-medium">
                    Eliminar
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </>
  );
}