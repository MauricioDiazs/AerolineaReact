import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import Moment from "react-moment";
import Swal from "sweetalert2";

const VuelosTable = () => {
  const [arrVuelos, setArrVuelos] = useState([]);
  const [capacidad, setCapacidad] = useState("");
  const [modelo_avion, setModelo_avion] = useState("");
  const [numero_vuelo, setNumero_vuelo] = useState("");
  const [pasajeros, setPasajeros] = useState("");
  const [fecha_salida, setFecha_salida] = useState();
  const [fecha_entrada, setFecha_entrada] = useState();
  const [aerolinea, setAerolinea] = useState("");
  const [ruta_id_ruta, setRuta_id_ruta] = useState("");

  const [seleccionoVuelo, setSeleccionoVuelo] = useState(false);

  let { id } = useParams();

  const ruta = (path) => {
    Router.push(path);
  };

  const getVuelos = async () => {
    setArrVuelos([]);

    let data = await fetch(
      "http://localhost:8080/vuelos/BuscarRuta?ruta=" + parseInt(id)
    );
    let result = await data.json();

    if (result.length > 0) {
      setArrVuelos(result);
    }
  };

  const detalleVuelo = (vuelo) => {

    let fechaI = new Date(vuelo.fecha_entrada);
    let fechaS = new Date(vuelo.fecha_salida);

    setCapacidad(vuelo.capacidad);
    setModelo_avion(vuelo.modelo_avion);
    setNumero_vuelo(vuelo.numero_vuelo);
    setPasajeros(vuelo.pasajeros);
    setFecha_salida(fechaS);
    setFecha_entrada(fechaI);
    setAerolinea(vuelo.aerolinea);
    setRuta_id_ruta(vuelo.ruta_id_ruta.ciudad);

    setSeleccionoVuelo(true);

  };

  const eliminarVuelo = (id) => {

    Swal.fire({
      title: "¿Esta seguro que desea eliminar el vuelo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonText: `Cancelar`,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setSeleccionoVuelo(false);
        eliminarVueloService(id);
      }
    });
  };

  const eliminarVueloService = async (id) => {
    let data = await fetch(`http://localhost:8080/vuelos/${id}`, {
      method: "DELETE",
    });
    if (data.status === 200 || data.status === 304) {
      setArrVuelos([]);
      getVuelos();
    }
  };

  const filtrarPorFecha = async (fecha) => {
    let fechaMoment = "";
    fechaMoment = moment(fecha).format("YYYY-MM-DD");

    setArrVuelos([]);

    let data = await fetch(
      "http://localhost:8080/vuelos/BuscarPorFecha?fecha_salida=" + fechaMoment
    );
    let result = await data.json();

    if (result.length > 0) {
      setArrVuelos(result);
    }
  };

  useEffect(() => {
    getVuelos();
  }, [arrVuelos.length !== []]);

  return (
    <React.Fragment>
      <div className="mx-5">
        <h1>Lista de vuelos</h1>
      </div>
      <div className="m-5">
        <Link to={`/crearVuelo/${id}`}>
          <button type="button" className="btn btn-primary mr-2">
            Crear Vuelo
          </button>
        </Link>

        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => window.history.back()}
        >
          Rutas
        </button>
      </div>

      <h5 className="mx-5">Filtros para consultar por fechas</h5>

      <div className="row mx-5">
        <div className="col-4">
          <label>Fecha salida</label>
          <DatePicker
            selected={fecha_salida}
            onChange={(date) => filtrarPorFecha(date)}
          />
        </div>
      </div>

      {arrVuelos.length === 0 ? (
        <div className="alert alert-primary m-5" role="alert">
          No se encontraron datos para la fecha de salida seleccionada
        </div>
      ) : (
        <div className="m-5">
          <div className="card sombra-table">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id Vuelo</th>
                    <th scope="col">Aerolinea</th>
                    <th scope="col">Fecha entrada</th>
                    <th scope="col">Fecha salida</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {arrVuelos.map((item, i) => (
                    <tr key={item.id_vuelo}>
                      <th scope="row w-100" onClick={() => detalleVuelo(item)}>
                        {item.id_vuelo}
                      </th>
                      <th scope="row w-100" onClick={() => detalleVuelo(item)}>
                        {item.aerolinea}
                      </th>
                      <th scope="row w-100" onClick={() => detalleVuelo(item)}>
                        <Moment format="yyyy/MM/DD">
                          {item.fecha_entrada}
                        </Moment>
                      </th>
                      <th scope="row w-100" onClick={() => detalleVuelo(item)}>
                        <Moment format="yyyy/MM/DD">{item.fecha_salida}</Moment>
                      </th>
                      <th scope="row w-100">
                        <button
                          type="button"
                          onClick={() => eliminarVuelo(item.id_vuelo)}
                          className="btn btn-primary mr-2"
                        >
                          Eliminar
                        </button>
                        <Link to={`/actualizarVuelo/${item.id_vuelo}`}>
                          <button
                            type="button"
                            className="btn btn-primary mr-2"
                          >
                            Editar
                          </button>
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="m-5">
        <h1>Detalle del vuelo</h1>

        {!seleccionoVuelo ? (
          <div className="alert alert-primary" role="alert">
            Debes seleccionar un vuelo para ver el detalle
          </div>
        ) : (
          <div className="card sombra-table">
            <div className="card-body">
              <div className="row w-100">
                <div className="col-3">
                  <strong>Capacidad</strong>
                </div>
                <div className="col-9">{capacidad}</div>
              </div>

              <div className="row w-100">
                <div className="col-3">
                  <strong>Modelo Avion</strong>
                </div>
                <div className="col-9">{modelo_avion}</div>
              </div>

              <div className="row w-100">
                <div className="col-3">
                  <strong>Numero Vuelo</strong>
                </div>
                <div className="col-9">{numero_vuelo}</div>
              </div>

              <div className="row w-100">
                <div className="col-3">
                  <strong>Pasajeros</strong>
                </div>
                <div className="col-9">{pasajeros}</div>
              </div>

              <div className="row w-100">
                <div className="col-3">
                  <strong>Fecha Salida</strong>
                </div>
                <div className="col-9">
                  <Moment format="YYYY/MM/DD">{fecha_salida}</Moment>
                </div>
              </div>

              <div className="row w-100">
                <div className="col-3">
                  <strong>Fecha Entrada</strong>
                </div>
                <div className="col-9">
                  <Moment format="YYYY/MM/DD">{fecha_entrada}</Moment>
                </div>
              </div>

              <div className="row w-100">
                <div className="col-3">
                  <strong>Aerolinea</strong>
                </div>
                <div className="col-9">{aerolinea}</div>
              </div>

              <div className="row w-100">
                <div className="col-3">
                  <strong>Rura Id ruta</strong>
                </div>
                <div className="col-9">{ruta_id_ruta}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default VuelosTable;
