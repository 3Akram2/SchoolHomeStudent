import React, { useEffect, useState } from 'react';
import { Grid, List, ListItem } from '@mui/material';
import TitleCard from '../TitleCard';
import ReceviedMailTemplete from './MailTemplete';
import { getReceviedMail } from '../../axios/requests';
function ReceviedMail() {
    const [mails, setMails] = useState([]);

    const fetchMail = async () => {
        try {
            const res = await getReceviedMail();
            setMails(res.data.mails.reverse());
        } catch (error) {
            console.error('Error fetching sent mails:', error);
        }
    };

    useEffect(() => {
        fetchMail();
    }, []);
  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
    <TitleCard text='Received Mail' />
    <Grid container>
        <List
        sx={{ height: '34rem', overflow: 'auto' ,width:'100%' }}
        >
            {mails.map((mail, index) => (
                <ListItem key={index}>
                    <ReceviedMailTemplete status={'From'} statusValue={mail.from} subject={mail.subject} body={mail.body} />
                </ListItem>
            ))}
        </List>
    </Grid>
</Grid>
  )
}

export default ReceviedMail