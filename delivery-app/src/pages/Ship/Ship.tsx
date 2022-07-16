import { Outlet } from "react-router-dom";
import ShipNavbar from "../../components/pages/Ship/ShipNavbar";

const Ship = () => {
  return (
    <div>
      <ShipNavbar />
      <Outlet />
    </div>
  );
};

export default Ship;
