
const request = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const Materia = require("../models/materia")
const jwt = require ("jsonwebtoken")
const Estudiante = require("../models/estudiante")

const generarToken= ()=>{
    return jwt.sign({userId:"fakeUserId"},"secretKey",{expiresIn:"1h"})
}


describe("Pruebas integradoras de materiaController", ()=>{

    it("Crear una nueva materia " , async ()=>{
        const token = generarToken()
        const  response = await request(app)
            .post("/api/materia")
            .set("Authorization" ,token )
            .send({
                nombre:"ciencias",
                estudiantes:[],
                profesor:"oscar torres"
            })



            expect(response.statusCode).toEqual(201);
            expect(response.body).toHaveProperty("_id")
            expect(response.body.nombre).toBe("ciencias")
            expect(response.body.profesor).toBe("oscar torres")

    })
    it(" deberia obtener Materias", async ()=>{
        const token = generarToken()
        
        try{
            await Materia.create({
            nombre:"sociales",
            estudiantes:[],
            profesor:"oscar torres"
        })
        }catch(error){
            console.error(`error al crear materia`)
        }
        const  response = await request(app)
            .get("/api/materia")
            .set("Authorization",`Bearer ${token}`)
        expect(response.status).toEqual(200);
        //expect(response.body.length).toBe(1);


    })
    it("Test para obtener materia por ID", async ()=>{
      
        const materia = await Materia.create({
            nombre:"sociales",
            estudiantes:[],
            profesor:"oscar torres"
        })
          const token = generarToken()
          const res = await request(app)
          .get(`/api/materia/${materia._id}`)
          .set("Authorization",token)
          expect(res.statusCode).toEqual(200)
          expect(res.body.nombre).toBe("sociales")
      
      
    })
    it("Test para actualizar materia usando el ID", async ()=>{
        const materia = await  Materia.create({
            nombre:"sociales",
            estudiantes:[],
            profesor:"oscar torres"
        })
        const token = generarToken()
        const res = await request(app)
        .put(`/api/materia/${materia._id}`)
        .set("Authorization", token).send({
            nombre:"programacion",
            estudiantes:[],
            profesor:"maira moure"
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.nombre).toBe("programacion")
        expect(res.body.profesor).toBe("maira moure")
       
      
      })
      it("Test para eliminar materia por Id", async()=>{
        const materia = await  Materia.create({
            nombre:"programacion",
            estudiantes:[],
            profesor:"maira moure"
  
        })
        token = generarToken()
        const res = await request(app).delete(`/api/materia/${materia._id}`)
        .set("Authorization", token)
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe(`Materia eliminada`)
  
      })
})