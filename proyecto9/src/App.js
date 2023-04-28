import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima'
import Error from './components/Error';
function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: '',
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado]=useState({});
  const [error, guardarError]=useState(false);
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      const appId = 'a4066e56a474ba42f0c69cd90a42dcf9';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&id=524901&appid=${appId}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarResultado(resultado);
      guardarConsultar(false);
      if(resultado.cod==="404"){
        guardarError(true);
      }else{
        guardarError(false);
      }
    };

    if (consultar) {
      consultarAPI();
    }
  }, [ciudad, pais, consultar]);
let componente;
if(error){
  componente=<Error mensaje="No hay resultados."/>
}else{
  componente=<Clima
  resultado={resultado}/> 
}
  return (
    <>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
