"use client";
import {Avatar, Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useSession} from "next-auth/react";

export default function SettingPage()
{
    const {data:session, status} = useSession();


    //Loading state
    if(status === 'loading')
    {
        return <p>Loading....</p>;
    }
    if(!session)
    {
        return <p>You need to be loggin in to view this page</p>;
    }

    // Extract user infomration from the session
    const {name, email, password, profile_pic,role} = session.user;


    return (
        <Container>
            <Typography variant = "h4" gutterBottom>
                User Profile
            </Typography>
            <Box display="flex" alignItems="center" marginBottom={2}>
                {/* Display user avatar */}
                <Avatar src={profile_pic} alt={name} sx={{ width: 80, height: 80, marginRight: 2 }} />
                <Typography variant="h5">{name}</Typography>
            </Box>

            <Typography variant="body1">
                <strong>Email:</strong> {email}
            </Typography>

            <Typography variant="body1">
                <strong>Role:</strong> {role}
            </Typography>

            <Typography variant="body1">
                <strong>Password (Hashed):</strong> {password} {/* Display hashed password */}
            </Typography>

        </Container>
    )
}