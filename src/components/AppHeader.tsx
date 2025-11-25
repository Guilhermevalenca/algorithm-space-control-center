import Button  from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import { Link } from "react-router";
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router";

export function AppHeader() {
  const navigate = useNavigate();

  return (
    <AppBar className="app-header" sx={{ bgcolor: (theme) => theme.palette.grey[800] }}>
      <Toolbar>
      <h1>Centro de Controle Espacial</h1>
        <Stack className="toolbar-custom" direction="row" sx={{ ml: "auto" }} spacing={1}>
        <Button variant="contained" color="secondary" href="/">
          Tripulante
        </Button>
        <Button variant="contained" color="secondary" href="/receptionist">
          Recepcionista
        </Button>
        <Button variant="contained" color="secondary" href="/specialist-assistance">
          Especialista
        </Button>
      </Stack>
      </Toolbar>
    </AppBar>
  );
}
