const request = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const Estudiante = require("../models/estudiante")
const jwt = require ("jsonwebtoken")

const generarToken= ()=>{
    return jwt.sign({userId:"fakeUserId"},"secretKey",{expiresIn:"1h"})
}
async function limpiarEstudiantes() {
    try {
      await Estudiante.deleteMany();
    } catch (error) {
      console.error('Error durante la limpieza de estudiantes:', error);
    }
  }
  
  async function cerrarConexion() {
    try {
      await mongoose.connection.close();
    } catch (error) {
      console.error('Error durante el cierre de la cierre de la conexión:', error);
   }
  }
  
  afterEach(async () => {
    await limpiarEstudiantes();
  });

describe("CRUD Estudiante con JWT",()=>{
    it("Deberia crear un nuevo estudiante", async ()=>{
        const token = generarToken()
        const res = await request(app)
        .post("/api/estudiantes")
        .set("Authorization", token)
        .send({
            nombre:"Juan Perez",
            matricula:true,
            edad:22
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("_id")
        expect(res.body).toHaveProperty("_id")
        expect(res.body.nombre).toBe("Juan Perez")
    })
    it("Test para obtener los estudiantes", async()=>{
      const token = generarToken()
    try{
      await Estudiante.create({
        nombre:"Juan Perez",
        matricula:true,
        edad:22
      
      })
    }catch (error){
      console.error(`error al crear el estudiante`)
    }
    const res = await request(app).get("/api/estudiantes").set("Authorization",token)
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toBe(1)
    })
    it("Test para obtener un estudiante por ID", async ()=>{
      
        const estudiante = await Estudiante.create({
          nombre:"Patricia Lopez",
          matricula:true,
          edad:30 
        })
          const token = generarToken()
          const res = await request(app)
          .get(`/api/estudiantes/${estudiante._id}`)
          .set("Authorization",token)
          expect(res.statusCode).toEqual(200)
          expect(res.body.nombre).toBe("Patricia Lopez")
      
      
    })
    it("Test para actualizar estudiante usando el ID", async ()=>{
      const estudiante = await  Estudiante.create({
        nombre: "pedro Perez",
        matricula:false,
        edad:15
      })
      const token = generarToken()
      const res = await request(app)
      .put(`/api/estudiantes/${estudiante._id}`)
      .set("Authorization", token).send({
        nombre :"Pedro Parra",
        matricula : true,
        edad: 15
      })
      expect(res.statusCode).toEqual(200)
      expect(res.body.nombre).toBe("Pedro Parra")
      expect(res.body.matricula).toEqual(true)
      expect(res.body.edad).toEqual(15)
    })
    it("Test para eliminar estudiantes por Id", async()=>{
      const estudiante = await  Estudiante.create({
        nombre: "Ana Martinez",
        matricula:false,
        edad:24


      })
      token = generarToken()
      const res = await request(app).delete(`/api/estudiantes/${estudiante._id}`)
      .set("Authorization", token)
      expect(res.statusCode).toEqual(200)
      expect(res.body.message).toBe(`estudiante con ${estudiante._id}eliminado `)

    })
})
