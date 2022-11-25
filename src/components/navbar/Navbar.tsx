import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/modules/user/UserSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", paddingTop: 2 }}
          >
            <Link to={`/home`} className="flex">
              <TextSnippetIcon sx={{ fontSize: 40, color: "white" }} />
              <Typography variant="h4" sx={{ color: "white", marginLeft: 2 }}>
                <b> API - CRUD</b>
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="subtitle1" sx={{ padding: 1 }}>
              Trabalho final módulo IV
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={11} sx={{ display: "flex", justifyContent: "end" }}>
            <div onClick={logoutUser}> Logout</div>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}
