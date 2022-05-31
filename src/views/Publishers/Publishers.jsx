import { Grid, Paper, Toolbar, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

export default function Publishers() {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto'
            }}>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240
                        }}>
                        <Typography>Publishers</Typography>
                    </Paper>
                </Grid>
            </Container>
        </Box>
    );
}
