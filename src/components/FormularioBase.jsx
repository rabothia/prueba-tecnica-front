import { useState } from 'react';
import './FormularioBase.css'
import FormularioBusqueda from './FormularioBusqueda';
import FormularioInfo from './FormularioInfo';
import { buscarTerceroPorNit } from '../service/AppService';

function FormularioBase(){

    const [tercero, setTercero] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
  
    const handleBuscarTercero = async (nit) => {
      setError(null);
      setCargando(true);
      
      try {
        const datosTercero = await buscarTerceroPorNit(nit);
        setTercero(datosTercero);
      } catch (err) {
        setError(err.message);
        setTercero(null);
      } finally {
        setCargando(false);
      }
    };

    return (
        <>
        <div id="formularioBase">
            <div>
                <h2>Digitar Nit Tercero a Consultar</h2>
                <FormularioBusqueda onBuscar={handleBuscarTercero}/>
                {cargando && <p className="cargando"> Buscando tercero...</p>}
                {error && <p className="error">{error}</p>}
            </div>

            <div>
                <h2>Detalles del Tercero</h2>
                {tercero ? (
                    <FormularioInfo tercero={tercero} /> ): 
                    (
                    <p className="info">Ingrese un Documento para buscar un tercero</p>
                    )}
            </div>
        </div>
        </>
    );
}

export default FormularioBase;