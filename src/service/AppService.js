
const BACKEND_PRUEBA_TECNICA = "http://localhost:8080/tercero";

export const buscarTerceroPorNit = async (nit) => {
  try {
    const response = await fetch(`${BACKEND_PRUEBA_TECNICA}/buscar/${nit}`);
    if (!response.ok) {
      throw new Error('Tercero no encontrado');
    }
    return await response.json();
  } catch (error) {
    console.error('Error buscando tercero:', error);
    throw error;
  }
};

export const actualizarTercero = async (tercero) => {
  try {
    const response = await fetch(`${BACKEND_PRUEBA_TECNICA}/editar/${tercero.terIderegistro}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tercero),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar tercero');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error actualizando tercero:', error);
    throw error;
  }
};