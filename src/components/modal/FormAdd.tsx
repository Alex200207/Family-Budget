const Form = () => {

    return (
        <div className="fixed inset-0 flex items-center justify-center custom-z bg-black bg-opacity-50 ">
        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
          <h2 className="text-xl font-semibold text-gray-800">
            Agregar Plan
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del Estudiante"
                className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Grupo
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Maestra
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Edad
              </label>
              <input
                type="number"
                name="edad"
                placeholder="Edad"
                className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Género
              </label>
              <select
                name="genero"
                className="border border-gray-300 rounded-md p-3 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione un género</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <div className="flex justify-between col-span-1 md:col-span-2 mt-6">
              <button
                type="submit"
                className="flex items-center border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md transition hover:bg-blue-500 hover:text-white"
              >
                Guardar
              </button>
              <button
                type="button"
                className="flex items-center border-2 border-red-500 text-red-500 px-4 py-2 rounded-md transition hover:bg-red-500 hover:text-white"
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
    }

export default Form;