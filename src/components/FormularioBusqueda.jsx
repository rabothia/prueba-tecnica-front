import './FormularioBase.css'
import buscarIcono from '../assets/buscar.png';
import { useState } from 'react';

function FormularioBusqueda({onBuscar}){
    const [nitTercero, setNitTercero] =useState('') ;
    const [error, setError] = useState('');

    const validarNit = (nit) =>{
        if (!nit.trim()) return 'Por favor digite un documento valido';
        if (isNaN(nit)) return 'El Documento debe ser numérico';
        return null;
    };

    const buscar =()=>{
        console.log(`buscando tercero ${nitTercero}`);
        
        const errorValidacion = validarNit(nitTercero);
        if (errorValidacion) {
          setError(errorValidacion);
          return;
        }
        
        setError('');
        onBuscar(nitTercero);      
    };

    return(
        <>
        <div id="FormularioBusqueda">
            <h3>Nit Tercero</h3> 
            <input 
            type="text" 
            id="nitTercero" 
            onChange={(e)=>setNitTercero(e.target.value)}
            className={error? 'input-error' : ''}
            />
            <button onClick={buscar} aria-label="Buscar tercero">
                <img src={buscarIcono} alt="Buscar" style={{ width: "24px", height: "24px" }} />
            </button>
            {error && <p className="error-input">{error}</p>}
        </div>
        </>
    )
}

export default FormularioBusqueda;