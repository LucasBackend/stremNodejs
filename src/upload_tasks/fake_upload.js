import csvParse from 'csv-parser';
import fs from 'node:fs';

const urlServer = 'http://localhost:3333/tasks'

const csvTasks = new URL('./db.csv',import.meta.url);

const csvParseOptions = {
  delimiter:',',
  colums:true,
  trim:true,
};

const readstream = fs.createReadStream(csvTasks)

const csvParser = readstream.pipe(csvParse(csvParseOptions))

async function fakeRequest(){
  for await(const chunk of csvParser){
    
    await fetch(urlServer,{
      method:"post",
      body: JSON.stringify(chunk),
      headers:{ "Content-Type": "application/json" },
    })

    console.log('Tasks criadas com sucesso.')
    
  }
}



fakeRequest()