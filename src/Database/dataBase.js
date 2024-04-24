import fs from 'node:fs'
import crypto from 'node:crypto'
import json2csv from 'json2csv'
import csvParser from 'csv-parser'
import { delimiter } from 'node:path'

const databasePath = new URL('./db.json',import.meta.url)
const datacsv = new URL('./db.csv',import.meta.url)

export class dataBase{
  #database = {}

  constructor(){
    
    try{
    this.#database = JSON.parse(fs.readFileSync(databasePath))
    }catch{
      
    }
    
  }
  
  insert(request,response,table){
    const dateNow = new Date();
    const {title,description} = request.body;
    const idUnique = crypto.randomUUID()
    
    
    if(!title || !description){
      const messagethrow = {"message":"Necessário titulo e descrição da tarefa"}
    
      return response.writeHead(404).end(JSON.stringify(messagethrow))

    } 
   
    const item = {
      "id":idUnique,
      "title":title,
      "description":description,
      "status":"pending",
      "compleat_at": null,
      "create_at": dateNow,
      "update_at":dateNow
    }

    
    if(this.#database[table]){
      
    this.#database[table] = [item,...this.#database[table]]
    }else{
      this.#database[table] = [item]
      
    }
    
    this.#saveDataBase()
    
    return response.writeHead(204).end()

  }

  update(request,response,table){
    const dateNow = new Date();
    const {title,description} = request.body;
    const {id} = request.params
        
    
    if(!title || !description){
      const messagethrow = {"message":"Necessário titulo e descrição da tarefa para atualizar"}
    
      return response.writeHead(404).end(JSON.stringify(messagethrow))

    } 
   
    const item = this.#database[table].find(item=> item.id === id)

    if(item){
      item.title = title;
      item.description = description;
      item.update_at = dateNow;
      this.#saveDataBase()
    }else{
      return response.writeHead(404).end(JSON.stringify({"message":"Tarefa não foi encontrada!"})) 
    }
    
    
    

  
    
    return response.writeHead(204).end()

  }

  complete(request,response,table){
    const dateNow = new Date();
    const {id} = request.params
        
    
    const item = this.#database[table].find(item=> item.id === id)
    
    if(item){
      item.status = "complete";
      item.update_at = dateNow;
      item.compleat_at = dateNow;
      this.#saveDataBase()
    }else{
      return response.writeHead(404).end(JSON.stringify({"message":"Tarefa não foi encontrada!"})) 
    }
        
    return response.writeHead(204).end()

  }

  read(request,response,table){
    response.end(JSON.stringify(this.#database[table]))
  }

  delete(request,response,table){
    const {id} = request.params

    if(!id){
      response.writeHead(404).end(JSON.parse({"message":"id necessário para deletar task"}))
    }

    this.#database[table] = this.#database[table].filter(item => item.id != id)

    this.#saveDataBase()

    response.writeHead(204).end()

  }

  #saveDataBase(){
    
    fs.writeFile(databasePath,JSON.stringify(this.#database),(error)=>{
      if(error){
        throw error
      }
    })

  }



}