import React, { useEffect, useState } from 'react';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import TitleCard from '../TitleCard';
import SentMailTemplete from './MailTemplete';
import { getSentMail } from '../../axios/requests';

function SentMail() {
    const [mails, setMails] = useState([]);

    const fetchMail = async () => {
        try {
            const res = await getSentMail();
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
            <TitleCard text='Sent Mail' />
            <Grid container>
                <List
                sx={{ height: '34rem', overflow: 'auto' ,width:'100%' }}
                >
                    {mails.map((mail, index) => (
                        <ListItem key={index}>
                            <SentMailTemplete status={'To'} statusValue={mail.to} subject={mail.subject} body={mail.body} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}

export default SentMail;
