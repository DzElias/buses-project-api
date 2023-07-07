import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { useContext} from "react";
import { DriversContext } from "../contexts/drivers.context";

import { socket } from '../socket';

const TABLE_HEAD = ["Ci", "Nombre completo", "Id del bus", "Contraseña"];

export default function Drivers() {

    const navigate = useNavigate();

    const { getDrivers } = useContext(DriversContext);
  
    const drivers = getDrivers();

    const redirect = (id) => {
        navigate( "/drivers/:" + id);
    };

    const deleteDriver = (id) => {
      socket.emit("deleteDriver", {id: id});
    }

    return (
    
        <>
        <div class="flex justify-between">
          <button className="btn btn-dark p-10" onClick={() => navigate(-1)}>
            Volver
          </button>

    
          <button className="btn p-10 text-lg" onClick={() => navigate("/drivers/new")}>
            Agregar Chofer
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
              {drivers.map(({ ci, name, busId, password, _id }, index) => {
                const isLast = index === drivers.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
     
                return (
                  <tr key={ci}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {ci}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {busId}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {password}
                      </Typography>
                    </td>
                    <td className={classes} onClick={() => redirect(_id)}>
                      <Typography  variant="small" color="blue" className="font-medium">
                        Editar
                      </Typography>
                    </td>
                    <td className={classes} onClick={() => deleteDriver(_id)}>
                      <Typography  variant="small" color="blue" className="font-medium">
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











// busId:                  String,
// ci:                     String,
// name:                   String,
// password:               String,
// token: String