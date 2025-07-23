import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../authStatus/AuthStatus";
import BottomNavigationComponent from "../../components/bottomNavigation/BottomNavigation";
import TopBarNavigation from "../../components/topBarNavigation/TopBarNavigation";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuthStatus();

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  if (user) {
    return (
      <>
        <TopBarNavigation />
        <main style={{ paddingBottom: "50px" }}>
          <Outlet />
        </main>
        <BottomNavigationComponent />
      </>
    );
  }

  return <Navigate to="/login" />;
}
