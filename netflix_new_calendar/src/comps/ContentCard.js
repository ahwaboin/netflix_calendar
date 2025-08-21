import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ContentCard({selectedEvent,handleDelete}) {
    console.log("ContentCard selectedEvent: ", selectedEvent);

    return (
        <Card sx={{ display: 'flex', margin: '20px auto', maxWidth: 800 }}>
            <Box sx={{ display: 'flex',margin:'40px auto'}}>
                <CardMedia
                    component="img"
                    sx={{ width: 350, flex: '1 0 auto'}}
                    image={`http://localhost:8080/imgs/${selectedEvent.image}`}
                    alt="perfect match"
                />
            </Box>
            <CardContent sx={{margin:"auto"}}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: '1.2em' }}>
                    {selectedEvent.firstCategory}
                </Typography>
                <Typography gutterBottom variant="h4" component="div" mb={0.2}>
                    {selectedEvent.title}
                </Typography>
                <Typography gutterBottom mb={1} 
                    sx={{ color: 'text.secondary', fontSize: '1em' }}>
                    {selectedEvent.secondCategory}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '1.3em' }}>
                    {selectedEvent.releaseDate}
                </Typography>
            <CardActions>
                <IconButton aria-label="delete" sx={{ margin: '0 auto'}}>
                    <DeleteIcon color='primary' fontSize='small'
                        onClick={() => handleDelete(selectedEvent.href)}
                    />
                </IconButton>
            </CardActions>
            </CardContent>
        </Card>
    );
}
