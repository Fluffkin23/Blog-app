import { Box, Container, Grid, Grid2, IconButton, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer ()
{
    return (
        <Box sx = {{backgroundColor:"#f8f8fa", padding: '20px 0 '}}>
            <Container>
                <Grid container spacing={4}>
                    {/** Footer Section 1 */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" gutterBottom>About Us</Typography>
                        <Typography variant="body2" color="textSecondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</Typography>
                    </Grid>
                    {/* Footer Section 2 */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" gutterBottom>Contact Us</Typography>
                        <Typography variant="body2" color="textSecondary">Email: info@example.com <br />Phone: +696969696</Typography>
                    </Grid>
                    {/** Footer Section 3 */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" gutterBottom> Follow Us </Typography>
                        <Box>
                            <IconButton arial-label="facebook"><FacebookIcon/></IconButton>
                            <IconButton arial-label="twitter"><TwitterIcon/></IconButton>
                            <IconButton arial-label="instagram"><InstagramIcon/></IconButton>
                        </Box>
                    </Grid>
                </Grid>
                {/** Footer Bottom text */}
                <Box mt={4} textAlign="center">
                    <Typography variant="body2" color="textSecondary">© {new Date().getFullYear()} Your Company. All rights reserved</Typography>
                </Box>
            </Container>
        </Box>
    );
}