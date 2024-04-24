import { dataBase } from "../Database/dataBase.js";
import {buildRoutePath} from "../utils/build-route-path-id.js"
const database = new dataBase()

export const routes = [

  {
    method:'GET',
    path: buildRoutePath('/tasks'),
    handler: (request,response)=>{
      
      database.read(request,response,'tasks')

    }
  },
  {
    method:'POST',
    path: buildRoutePath('/tasks'),
    handler: (request,response)=>{
      
      database.insert(request,response,'tasks')
 

    }
  },
  {
    method:'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (request,response)=>{
      
      database.delete(request,response,'tasks')
 

    }
  },
  {
    method:'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (request,response)=>{
      
      database.update(request,response,'tasks')
 

    }
  },
  {
    method:'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (request,response)=>{
      
      database.complete(request,response,'tasks')
 

    }
  },
  {
    method:'POST',
    path: buildRoutePath('/tasks/csv'),
    handler: (request,response)=>{
      
      database.csv(request,response,'tasks')
 

    }
  }

] 