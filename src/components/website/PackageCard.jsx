
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Stack } from "@mui/material"
import { Link } from "react-router-dom"

export default function PackageCard({ title, period, organizer, image }) {
  return (
    <div className="h-full shadow-card bg-red p-4 rounded-lg">
      <CardMedia component="img" height="180" image={image} alt={title} />
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: { sm: "18px", lg: "24px" } }}>
          {title}
        </Typography>
        <Stack spacing={0.5} className="mt-2 text-sm">
          <div variant="body2" className="text-webPara text-[16px] ">Time Period: {period}</div>
          <div variant="body2" className="text-[16px] text-webPara">Organized By: {organizer}</div>
        </Stack>
      </CardContent>
      <CardActions className="flex gap-3">
        {/* <Button size="small" variant="outlined" color="primary">
          Know More
        </Button>
        <Button size="small" variant="contained" color="primary"  >
          Book ZATRA
        </Button> */}
         <Link to="/religious" className="w-full">
          <button className="btn-second w-full">
            Know More
          </button>
        </Link>
        <button className=" btn-first w-full ">
          Book ZATRA
        </button>
      </CardActions>
    </div>
  )
}
