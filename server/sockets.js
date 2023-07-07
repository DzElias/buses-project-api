import Bus from "./models/bus.js";
import Stop from "./models/stop.js";
// import Point from "./models/point.js";
import Driver from "./models/driver.js";
import Wait from "./models/wait.js"

export default (io) => {
  io.on("connection", (socket) => {
    const emitStops = async () => {
      const stops = await Stop.find();
      io.emit("loadStops", stops);
    };

    const emitBuses = async () => {
      const buses = await Bus.find();
      io.emit("loadBuses", buses);
    };

    const emitDrivers = async () => {
      const drivers = await Driver.find();
      io.emit("loadDrivers", drivers);
    };

    emitBuses();
    emitStops();
    emitDrivers();

    socket.on("newStop", async (data) => {
      const newStop = new Stop({
        title: data.title,
        latitude: data.latitude,
        longitude: data.longitude,
        esperas: 0,
      });

      await newStop.save();
      emitStops();
    });

    socket.on("deleteStop", async (data) => {
      const id = data.id;

      await Stop.deleteOne({_id: id});
      emitStops();
    })

    socket.on("updateStop", async (data) => {
      await Stop.updateOne({ _id: data.id}, data.updatedStop);
      emitStops();
    })

    socket.on("newBus", async (data) => {
      const stops = data.stops.split(",");
      const newBus = new Bus({
        company: data.company,
        line: data.line,
        stops: stops,
        nextStop: stops[0],
        latitude: 0.0,
        longitude: 0.0,
        ruta: data.ruta,
        num: data.num,
        isActive: false,
      });

      await newBus.save();
      emitBuses();
    });

    socket.on("deleteBus", async (data) => {
      const id = data.id;

      await Bus.deleteOne({_id: id});
      emitBuses();
    })

    socket.on("updateBus", async (data) => {
      await Bus.updateOne({ _id: data.id}, data.updatedBus);
      emitBuses();
    })

    socket.on("newDriver", async (data) => {
      const password = Math.trunc(
        Math.random() * (9999 - 1000) + 1000
      ).toString();
      const newDriver = new Driver({
        busId: data.busId,
        ci: data.ci,
        name: data.name,
        password: password,
        token: "",
      });

      await newDriver.save();
      emitDrivers();
    });

    socket.on("deleteDriver", async (data) => {
      const id = data.id;

      await Driver.deleteOne({_id: id});
      emitDrivers();
    })

    socket.on("updateDriver", async (data) => {
      await Driver.updateOne({ _id: data.id}, data.updatedDriver);
      emitDrivers();
    })

    socket.on("busOnWay", async (data) => {
      const busId = data;
      await Bus.updateOne({ _id: busId }, { $set: { isActive: true } });
      emitBuses();
    });

    socket.on("busOffWay", async (data) => {
      const busId = data;
      await Bus.updateOne({ _id: busId }, { $set: { isActive: false } });
      emitBuses();
    });

    socket.on("change-location", async (data) => {
      const busid = data[0];
      const latitude = data[1];
      const longitude = data[2];

      await Bus.updateOne(
        { _id: busid },
        { $set: { latitude: latitude, longitude: longitude } }
      );
      emitBuses();
    });

    socket.on("change-nextStop", async (data) => {
      //Guardar hora en la que llego a la parada...
      const busid = data[0];
      const stopId = data[1];

      await Bus.updateOne({ _id: busid }, { $set: { nextStop: stopId } });
      emitBuses();
    });

    socket.on("addWait", async (data) => {
      const stopId = data;
      const stop = await Stop.findOne({ _id: stopId });
      const date = new Date(year,month,day,hours,minutes)

      // Guardar hora, parada en donde se espero
      const wait = new Wait( {
        stopId: stopId,
        date: date 
      });

      await wait.save();

      await Stop.updateOne(
        { _id: stopId },
        { $set: { waiting: stop.waiting + 1 } }
      );
      emitStops();
    });

    socket.on("substractWait", async (data) => {
      const stopId = data;
      const stop = await Stop.findOne({ _id: stopId });

      if(stop.waiting <= 0){
        await Stop.updateOne(
          { _id: stopId },
          { $set: { waiting: 0 } }
        );
      }else{
        await Stop.updateOne(
          { _id: stopId },
          { $set: { waiting: stop.waiting - 1 } }
        );
      }
      
      emitStops();
    });
  });
};
