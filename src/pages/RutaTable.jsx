import React, { useEffect, useState } from "react";
import "./../styles/RutaTable.css";
import TablaRutas from "./../components/table"

function RutaTable(datos) {
  const [arrRutas, setArrRutas] = useState([]);

  const getRutas = async () => {
    setArrRutas([]);
    let data = await fetch("http://localhost:8080/Ruta/OptenerRuta");
    let result = await data.json();

    if (result.length > 0) {
      setArrRutas(result);
    }
  };

  useEffect(() => {
    if (arrRutas.length === 0) {
      getRutas();
    }
  }, [arrRutas.length !== []]);

  return (
    <React.Fragment>
      <div className="mx-5">
        <h1>Lista de rutas</h1>
      </div>
      <TablaRutas contenido={arrRutas}></TablaRutas>
    </React.Fragment>
  );
}

export default RutaTable;
