import { useEffect, useState } from "react";
import { actualizarTercero } from "../service/AppService";

function FormularioInfo({tercero: terceroEncontrado}){

    const [tercero, setTercero] =useState(terceroEncontrado || {});
    const [isEnabled, setIsEnabled] =useState(true);
    const [mensaje, setMensaje] = useState({texto:'',tipo:''});
    const [cargando, setCargando] = useState(false);

    //aqui sincroniza los cambios del prop
    useEffect(()=>{
        setTercero(terceroEncontrado || {});
        setIsEnabled(true) //cuando se busque otro tercero
        console.log("state.tercero:", tercero);
    }, [terceroEncontrado]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsEnabled(true);

        try{
            if(!isValidEmail(tercero.terCorreo)){
                 throw new Error("Correo electronico invalido");
            }
        
        //para el back
        const terceroActualizado = await actualizarTercero(tercero);

        //Actualizar en vista
        setTercero(terceroActualizado);
        setMensaje({texto:"Tercero actualizado con exito", tipo:"exito"});
        setIsEnabled(true);
        } catch (error){
            setMensaje({texto: error.message, tipo:"error"});
        } finally {
            setCargando(false);
        }

        //retirar mensaje
        setTimeout(() => setMensaje({texto:'', tipo:''}),5000);
    }


    const handleValueInput = (e) =>{
        //const getInputId = e.target.id;
        //const getInputValue = e.target.value;
        // setTercero(tercero => ({
        //     ...tercero, [getInputId] : getInputValue
        // })); console.log(tercero)
        const {id, value} = e.target;
        setTercero(prev => ({
            ...prev,
            [id]:value
        }));
    };

    const isValidEmail = (email) =>{
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
    
    return( 
    <>
    <form onSubmit={handleSubmit} className="formulario-tercero">
        {mensaje.texto && (
            <div className={`mensaje ${mensaje.tipo}`}>
                {mensaje.texto}
            </div>
        )}

        <fieldset>
            <legend>Informacion General Tercero</legend>
            <div className="campo-formulario">
            <label htmlFor="terNombre">Nombre/s Tercero</label>
            <input 
            type="text" 
            id="terNombre" 
            onChange={handleValueInput} 
            value={tercero.terNombre || ''} 
            disabled={isEnabled || cargando}
            required
            />
            </div>
            <div className="campo-formulario">
            <label htmlFor="terApellido">Apellido/s Tercero</label>
            <input 
            type="text" 
            id="terApellido" 
            onChange={handleValueInput} 
            value={tercero.terApellido || ''} 
            disabled={isEnabled || cargando}
            required
            />
            </div>
        </fieldset>

        <fieldset>
            <legend>Informacion de Contacto Tercero</legend>
            <div className="campo-formulario">
            <label htmlFor="terTelcelular">Numero Celular</label>
            <input 
            type="tel" 
            id="terTelcelular" 
            onChange={handleValueInput} 
            value={tercero.terTelcelular || ''} 
            disabled={isEnabled || cargando}
            pattern="[0-9]{10}"
            title="Numero de 10 digitos"
            />
            </div>
            <div className="campo-formulario">
            <label htmlFor="terCorreo">Correo Electronico</label>
            <input 
            type="email" 
            id="terCorreo" 
            onChange={handleValueInput} 
            value={tercero.terCorreo || ''} 
            disabled={isEnabled || cargando}
            required
            className={tercero.terCorreo && !isValidEmail(tercero.terCorreo)?'input-error':''}
            />
            </div>
        </fieldset>
        <div className="acciones-formulario">
        <button 
        type="button" 
        onClick={() => setIsEnabled(false)}
        disabled={!tercero.terIderegistro || cargando}
        className="boton-editar">Editar</button>
        <button 
        type="submit"
        disabled={isEnabled || cargando}
        className="boton-guardar" >{cargando? "Guardando":"Guardar"}
        </button>
        </div>
    </form>
    </>
);
}

export default FormularioInfo;