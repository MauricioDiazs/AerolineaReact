import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/table.css"
import "./../index.css"

function Tabla({ contenido }) {
  const [contenidoState, setContenidoState] = useState(contenido);

  useEffect(() => {
    setContenidoState(contenido);
  }, [contenido]);

  return (
    <React.Fragment>
      <div className="m-5">
        <div className="card sombra-table">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Ciudad</th>
                </tr>
              </thead>
              <tbody>
                {contenidoState.map((item, i) => (
                  
                    <tr key={item.id_ruta}>
                        
                      <th scope="row w-100"><Link to={`/vuelos/${item.id_ruta}`}>{item.id_ruta}</Link></th>
                      <th scope="row w-100"><Link to={`/vuelos/${item.id_ruta}`}>{item.ciudad}</Link></th>
                  

                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Tabla;
