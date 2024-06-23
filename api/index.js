
import express from 'express';
import serverless from "serverless-http";
import { createTasks, updateTasks, deleteTasks, fetchTasks } from './task.js';
import cors from "cors";
const app = express();
const port = 3001;


app.use(express.json())

if(process.env.DEVELOPMENT){
    app.use(cors());
}

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/task', async (req, res) => {
    try{
        const tasks = await fetchTasks();
    
        res.send(tasks.Items)
      }
      catch(err) {
        res.status(400).send(`error fetching tasks: ${err}`)
      }
  })
  app.post('/task', async (req, res) => {
    try{
        const task = req.body;
        const response  = await createTasks(task);
        res.send(response)
      }
      catch(err) {
        res.status(400).send(`error creating tasks: ${err}`)
      }
  })
  app.put('/task', async (req, res) => {
    try{
        const task = req.body;
        const response  = await updateTasks(task);
        res.send(response)
      }
      catch(err) {
        res.status(400).send(`error Updating tasks: ${err}`)
      }
  })
  app.delete('/task/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const response  = await deleteTasks(task);
        res.send(response)
      }
      catch(err) {
        res.status(400).send(`error deleting tasks: ${err}`)
      }
  })

  if(process.env.DEVELOPMENT){
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

}
export const handler =  serverless(app);