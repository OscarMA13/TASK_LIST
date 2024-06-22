import { Button } from '@mui/base';
import { Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UpdateTaskForm } from './UpdateTaskForm';
import classnames from "classnames";
import axios from "axios";
import { API_URL } from '../utils';

export const Task = ({task, fetchTasks}) => {
    const {id,name,completed} = task;
    const [IsComplete, setIsComplete] = useState(completed)
    const [IsDialogOpen, setIsDialogOpen] = useState(false)
    const handleUpdateCompletion = async () => {
        try{
            await axios.put(API_URL,{
                id,name,completed: !IsComplete,
            });
            setIsComplete((prev) => !prev);
        }catch(err){
            console.log(err);
        }
        
    }

    const handleDeleteTask = async () => {
       try{
        await axios.delete(`${API_URL}/${task.id}`);

        await fetchTasks();
       }catch(err){
        console.log(err);
       }
    }
  return (
    <div className='task'>
        <div className = {classnames("flex", {
            done: IsComplete
        })}>
        <Checkbox checked = {IsComplete}  onChange={handleUpdateCompletion}/>
        <Typography variant='h4' >{name}</Typography>
        </div>
        <div className='taskButtons'>
        <Button variant ="contained" onClick={() => setIsDialogOpen(true)}>
            <EditIcon/>
         </Button>
         <Button color='error' variant ="contained" onClick={handleDeleteTask}>
            <DeleteIcon/>
         </Button>
        </div>
         <UpdateTaskForm
         fetchTasks={fetchTasks} 
         IsDialogOpen={IsDialogOpen}
         setIsDialogOpen={setIsDialogOpen}
         task = {task}
         />
    </div>
  )
}
