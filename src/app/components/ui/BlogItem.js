import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";

export default function BlogItem({title, summary, image, data}){
    return(
        <Card sx = {{maxWidth: 345, m:"auto", boxShadow: 3, display:"flex", flexDirection:"column", justifyContent:"column", height:"100%"}}>
            {/** Image Section */}
            <CardMedia>
                <Image src={image} alt={title || "Blog Image"} width={345} height={200} layout="responsive"></Image>
            </CardMedia>         

            {/** Blog Content Section */}
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>{title}</Typography>
                {/** <Typography variant="body2" color="text.secondary">{date}</Typography>*/}
                <Typography variant="body1" component="p" sx={{mt:2}}>{summary}</Typography>
            </CardContent>  
        </Card>
    );
}