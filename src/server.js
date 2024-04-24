import http from "node:http"
import { routes } from "./routes/server.routes.js"
import { json } from "./middleware/json.js"
import {extractQueryParams} from './utils/extract-query-params.js'


const server = http.createServer(async (request,response)=>{
  
  const {method,url} = request

  await json(request,response)

  const route = routes.find((route)=>{
    return route.method===method && route.path.test(url)
  
  })
  
  if(route){
    const routeParams = request.url.match(route.path)
    
    const {query,...params} = routeParams.groups

    request.params = params
    request.query = query ? extractQueryParams(query):{}

    return route.handler(request,response)
  }
  

  response.writeHead(404).end('not found')

})

const PORT = 3333

server.listen(PORT)