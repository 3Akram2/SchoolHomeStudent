import React from 'react'
import { Paper, Typography, Grid, Divider } from '@mui/material'
function SentMailTemplete({status,statusValue,subject,body}) {
  return (
   <Paper
   elevation={2}
   sx={{width:'100%',height:'9rem',margin:0.5,backgroundColor:'secondary.main',padding:1,border:'solid 1px'}}
   
   >
    <Grid item md={12}>
    <Typography variant='h6' color={'primary.main'}>
    {status}: {statusValue}
   </Typography>
   <Divider/>
    </Grid>
    <Grid item md={12}>
    <Typography variant='h6'color={'primary.main'} >
    Subject: {subject}
   </Typography>
   <Divider/>
    </Grid>
    <Grid item md={12}  >
    <Typography variant='h6' color={'primary.main'}  >
    Body: {body}
   </Typography>
    </Grid>
   
   
   
   </Paper>
  )
}

export default SentMailTemplete