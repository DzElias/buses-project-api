import { useContext} from "react";
import { UserContext } from "../contexts/user.context";
import { useNavigate } from "react-router-dom";


const callouts = [
  {
    name: "Paradas",
    description: "Paradas",
    imageSrc: require('../images/stop.png'),
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "stops",
  },
  {
    name: "Buses",
    description: "Buses",
    imageSrc: require('../images/bus.png'),
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "buses",
  },
  {
    name: "Choferes",
    description: "Choferes",
    imageSrc:
    require('../images/driver.png'),
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "drivers",
  },
];
         
export default function Home() {
  const navigate = useNavigate();
  
  const { logOutUser } = useContext(UserContext);

  // This function is called when the user clicks the "Logout" button.
  const logOut = async () => {
    try {
      // Calling the logOutUser function from the user context.
      const loggedOut = await logOutUser();
      // Now we will refresh the page, and the user will be logged out and
      // redirected to the login page because of the <PrivateRoute /> component.
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const redirect = (direction) => {
    navigate("/" + direction);
  };




  return (
    <>
      <div>
        <div className="bg-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
              <h2 className="text-2xl font-bold text-gray-900">Panel de Administrador</h2>

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                {callouts.map((callout) => (
                  <div onClick={() => redirect(callout.href)} key={callout.name} className="group relative" >
                    <div   className="relative h-100 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <img
                        src={callout.imageSrc}
                        alt={callout.imageAlt}
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">
                      {callout.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="bg-black text-2xl font-bold text-white p-3 rounded-lg "
              onClick={logOut}
            >
              Cerrar Sesion
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
