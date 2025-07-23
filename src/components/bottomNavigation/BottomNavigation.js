import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const funcParam = {
  "/entregar": "getAluguelEntregar",
  "/entregue": "getAluguelEntregue",
  "/pendente": "getAluguelPendente",
  "/finalizado": "getAluguelFinalizado",
};

export default function BottomNavigationComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleNavClick = (path) => {
    const funcName = funcParam[path];
    if (funcName) {
      navigate(`${path}?call=${encodeURIComponent(funcName)}`);
    } else {
      navigate(path);
    }
  };

  return (
    <Box
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        alignItens: "center",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleNavClick(newValue);
        }}
      >
        <BottomNavigationAction
          value="/entregar"
          label="ENTREGAR"
          icon={<RestoreIcon />}
          style={{ height: "100%" }}
        />
        <BottomNavigationAction
          value="/entregue"
          label="ENTREGUE"
          icon={<FavoriteIcon />}
          style={{ height: "100%" }}
        />
        <BottomNavigationAction
          value="/pendente"
          label="PENDENTE"
          icon={<LocationOnIcon />}
          style={{ height: "100%" }}
        />
        <BottomNavigationAction
          value="/finalizado"
          label="FINALIZADO"
          icon={<LocationOnIcon />}
          style={{ height: "100%" }}
        />
      </BottomNavigation>
    </Box>
  );
}
