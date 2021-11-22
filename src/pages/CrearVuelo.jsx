import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from "react-router-dom";

const CrearVuelo = () => {
  let { id } = useParams();

  const [id_vuelos, setId_vuelos] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [modelo_avion, setModelo_avion] = useState("");
  const [numero_vuelo, setNumero_vuelo] = useState("");
  const [pasajeros, setPasajeros] = useState("");
  const [fecha_salida, setFecha_salida] = useState("");
  const [fecha_entrada, setFecha_entrada] = useState("");
  const [aerolinea, setAerolinea] = useState("");
  const [ruta_id_ruta, setRuta_id_ruta] = useState("");
  const [rutaCiudad, setRutaCiudad] = useState("");
  const [arrRutas, setArrRutas] = useState([]);

  const guardarVuelo = async () => {
    let datos = {};
    datos = {
      id_vuelo: parseInt(id_vuelos),
      capacidad: parseInt(capacidad),
      modelo_avion: modelo_avion,
      numero_vuelo: numero_vuelo.toString(),
      pasajeros: pasajeros,
      fecha_salida: fecha_salida,
      fecha_entrada: fecha_entrada,
      aerolinea: aerolinea,
      ruta_id_ruta: {
        id_ruta: ruta_id_ruta,
        ciudad: rutaCiudad,
      },
    };

    if (
      id_vuelos === "" ||
      capacidad === "" ||
      modelo_avion === "" ||
      numero_vuelo === "" ||
      pasajeros === "" ||
      fecha_salida === "" ||
      fecha_entrada === "" ||
      aerolinea === "" ||
      ruta_id_ruta === ""
    ) {
      Swal.fire("Debes diligenciar todos los campos.");
    } else {
      let data = await fetch(`http://localhost:8080/vuelos/CrearVuelo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      let result = await data.json();

      if (data.status === 200 || data.status === 304 || data.status === 201) {
        Swal.fire("El vuelo se ha creado exitosamente.");
        window.history.back();
      }
      
    }
  };

  const getRutas = async () => {
    setArrRutas([]);
    let data = await fetch("http://localhost:8080/Ruta/OptenerRuta");
    let result = await data.json();

    if (result.length > 0) {
      setArrRutas(result.filter((x) => x.id_ruta === parseInt(id)));
      setRuta_id_ruta(
        result.filter((x) => x.id_ruta === parseInt(id))[0].id_ruta
      );
      setRutaCiudad(result.filter((x) => x.id_ruta === parseInt(id))[0].ciudad);
    }
  };

  useEffect(() => {
    if (arrRutas.length === 0) {
      getRutas();
    }
  }, [arrRutas.length !== []]);

  return (
    <React.Fragment>
      <div className="m-5">
        <h1 className="d-flex w-100 justify-content-center text-center">
          CREAR VUELO
        </h1>

        <div className="row m-0 d-flex justify-content-center">
          <div className="col">
            <label>Id Vuelo</label>
            <input
              type="number"
              name="Id Vuelo"
              onChange={(e) => setId_vuelos(e.target.value)}
            />
          </div>

          <div className="col">
            <label>Capacidad</label>
            <input
              type="number"
              name="capacidad"
              onChange={(e) => setCapacidad(e.target.value)}
            />
          </div>
        </div>

        <div className="row m-0 d-flex justify-content-center">
          <div className="col">
            <label>Numero vuelo</label>
            <input
              type="number"
              name="numVuelo"
              onChange={(e) => setNumero_vuelo(e.target.value)}
            />
          </div>

          <div className="col">
            <label>Modelo avión</label>
            <input
              type="text"
              name="modAvion"
              onChange={(e) => setModelo_avion(e.target.value)}
            />
          </div>
        </div>

        <div className="row m-0 d-flex justify-content-center">
          <div className="col">
            <label>Pasajeros</label>
            <input
              type="number"
              name="pasajeros"
              onChange={(e) => setPasajeros(e.target.value)}
            />
          </div>

          <div className="col">
            <label>Fecha entrada</label>
            <DatePicker
              selected={fecha_entrada}
              onChange={(date) => setFecha_entrada(date)}
            />
          </div>
        </div>

        <div className="row m-0 d-flex justify-content-center">
          <div className="col">
            <label>Fecha salida</label>
            <DatePicker
              selected={fecha_salida}
              onChange={(date) => setFecha_salida(date)}
            />
          </div>

          <div className="col">
            <label>Aerolinea</label>
            <input
              type="text"
              name="aero"
              onChange={(e) => setAerolinea(e.target.value)}
            />
          </div>
        </div>

        <div className="row m-0 d-flex justify-content-center">
          <button
            className="btn btn-primary w-25 m-5"
            onClick={() => guardarVuelo()}
          >
            Guardar
          </button>

          <button
            className="btn btn-primary w-25 m-5"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CrearVuelo;
