const express = require("express");
const { sql, poolPromise } = require("./db");

const app = express();

const cors = require("cors");
app.use(cors());

// Permite recibir informaciÃ³n en formato JSON
app.use(express.json());


// =====================================================
// MÃ‰TODO GET
// Consultar todos los alumnos
// =====================================================
// =====================================================
// RUTAS DE EMPLEADOS (GET y POST)
// =====================================================

// 1. Obtener todos los empleados
app.get("/api/empleados", async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT IdEmpleado, Nombre, Apellido, CUI, Puesto, Salario 
            FROM Empleados
        `);
        res.json(result.recordset);
    } catch (error) {
        console.error("Error al consultar empleados:", error);
        res.status(500).json({
            mensaje: "Error al consultar los empleados",
            error: error.message
        });
    }
});

// 2. Registrar un nuevo empleado
app.post("/api/empleados", async (req, res) => {
    try {
        const { Nombre, Apellido, CUI, Puesto, Salario } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input("Nombre", sql.VarChar(50), Nombre)
            .input("Apellido", sql.VarChar(50), Apellido)
            .input("CUI", sql.VarChar(20), CUI)
            .input("Puesto", sql.VarChar(50), Puesto)
            .input("Salario", sql.Decimal(10, 2), Number(Salario))
            .query(`
                INSERT INTO Empleados (Nombre, Apellido, CUI, Puesto, Salario)
                VALUES (@Nombre, @Apellido, @CUI, @Puesto, @Salario)
            `);

        res.status(201).json({
            mensaje: "Empleado registrado correctamente"
        });
    } catch (error) {
        console.error("Error al insertar empleado:", error);
        res.status(500).json({
            mensaje: "Error al insertar el empleado",
            error: error.message
        });
    }
});

// =====================================================
// INICIAR SERVIDOR
// =====================================================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor ejecutandose en http://localhost:${PORT}`
    );

});