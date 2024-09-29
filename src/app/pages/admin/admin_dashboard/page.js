"use client";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard"
import ArticleIcon from "@mui/icons-material/Article";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import {
    AppBar, ButtonBase,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon, ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";


const drawerWidth = 240;

export default function AdminDashboard({children})
{
    const {data:session, status} = useSession();
    const router = useRouter();

    // if the user is not logged it, redirect to the login
    if(!session || session.user.role !=="admin")
    {
        // router.push("/pages/login");
        // return<p>Redirecting....</p>
    }

    const handleLogout = () =>
    {
        // Add logic for loggin out
    };

    const menuItems =
    [
        {text: "Dashboard", icon :<DashboardIcon/>, path:"admin_dashboard"},
        {text: "Blog Management", icon:<ArticleIcon/>, path:"blog_management"},
        {text:"Upload blog", icon: <UploadFileIcon/> , path:"upload_post"},
        { text: "User Management", icon: <PersonIcon />, path: "user_management" },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin Panel
                    </Typography>
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={handleLogout}
                        sx={{ marginLeft: "auto" }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={item.text}>
                            <ButtonBase onClick={() => router.push(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ButtonBase>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}