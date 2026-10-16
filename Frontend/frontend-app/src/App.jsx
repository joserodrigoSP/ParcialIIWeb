import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tab, setTab] = useState("productos");

  // Estados de Productos
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Laptop Dell XPS", precio: 1200.00, stock: 10, categoria: "Electrónica" },
    { id: 2, nombre: "Teclado Mecánico", precio: 85.50, stock: 25, categoria: "Accesorios" },
    { id: 3, nombre: "Monitor 27'' 4K", precio: 350.00, stock: 8, categoria: "Monitores" }
  ]);

  // Estados de Empleados
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    Nombre: "",
    Apellido: "",
    CUI: "",
    Puesto: "",
    Salario: ""
  });

  // Cargar Empleados desde el backend Express
  const cargarEmpleados = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/empleados");
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const handleEmpleadoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/empleados", nuevoEmpleado);
      alert("Empleado registrado con éxito");
      setNuevoEmpleado({ Nombre: "", Apellido: "", CUI: "", Puesto: "", Salario: "" });
      cargarEmpleados();
    } catch (error) {
      console.error("Error al registrar empleado:", error);
      alert("Error al guardar en la base de datos");
    }
  };

  return (
    <div className="container">
      <h1>Panel de Gestión Web</h1>

      <div className="tabs">
        <button className={tab === "productos" ? "active" : ""} onClick={() => setTab("productos")}>
          Listado de Productos
        </button>
        <button className={tab === "empleados" ? "active" : ""} onClick={() => setTab("empleados")}>
          Registro de Empleados
        </button>
      </div>

      {/* SECCIÓN 1: LISTADO DE PRODUCTOS */}
      {tab === "productos" && (
        <section>
          <h2>Catálogo de Productos</h2>
          <div className="card-grid">
            {productos.map((p) => (
              <div className="card" key={p.id}>
                <h3>{p.nombre}</h3>
                <p><strong>Categoría:</strong> {p.categoria}</p>
                <p><strong>Precio:</strong> ${p.precio}</p>
                <p><strong>Stock disponible:</strong> {p.stock} uds.</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECCIÓN 2: REGISTRO Y TABLA DE EMPLEADOS */}
      {tab === "empleados" && (
        <section>
          <h2>Registrar Nuevo Empleado</h2>
          <form onSubmit={handleEmpleadoSubmit} style={{ marginBottom: "30px" }}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                required
                value={nuevoEmpleado.Nombre}
                onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, Nombre: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Apellido:</label>
              <input
                type="text"
                required
                value={nuevoEmpleado.Apellido}
                onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, Apellido: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>CUI / DPI:</label>
              <input
                type="text"
                required
                value={nuevoEmpleado.CUI}
                onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, CUI: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Puesto:</label>
              <input
                type="text"
                required
                value={nuevoEmpleado.Puesto}
                onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, Puesto: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Salario:</label>
              <input
                type="number"
                step="0.01"
                required
                value={nuevoEmpleado.Salario}
                onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, Salario: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-submit">Guardar Empleado</button>
          </form>

          <h2>Empleados Registrados</h2>
          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>CUI</th>
                <th>Puesto</th>
                <th>Salario</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp) => (
                <tr key={emp.IdEmpleado}>
                  <td>{emp.IdEmpleado}</td>
                  <td>{emp.Nombre}</td>
                  <td>{emp.Apellido}</td>
                  <td>{emp.CUI}</td>
                  <td>{emp.Puesto}</td>
                  <td>${emp.Salario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default App;