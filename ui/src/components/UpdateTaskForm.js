import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { API_URL } from '../utils';

export const UpdateTaskForm = ({
    fetchTasks,
    isDialogOpen, 
    setIsDaialogOpen, 
    task}) => {
    const {id, completed} = task;
    const [taskName,setTaskName] = useState("");

    const handleUpdateTaskName = async () => {
        try{
            await axios.put(API_URL, {
                id,name:taskName,completed,
            });

            await fetchTasks();
            setTaskName("");
        }catch(err){
            console.log(err);
        }
    };


  return <Dialog open ={isDialogOpen}>
<DialogTitle> Edit Task </DialogTitle>
<div className='dialog'>
    <TextField 
    size='small' 
    label= "Task" 
    variant='outlined' 
    onChange ={(e) => setTaskName(e.target.value)}/>
    <Button
     variant = "contained"
     onClick = { async () => {
        await handleUpdateTaskName();
        setIsDaialogOpen(false);
     }}>
        <CheckIcon/>
    </Button>
</div>
  </Dialog>
  
}
