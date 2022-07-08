import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LoginModal from "../../components/pages/Hompage/LoginModal";
import { useAuthContext } from "../../provider/AuthProvider/AuthProvider";

const Homepage = () => {
  const { isLogin, handleOnSubmitLogin, handleOnSubmitLogout } =
    useAuthContext();
  const [isOpen, setOpen] = useState(false);

  const [items, setItems] = useState([]);

  const getItemsFromLocalStorage = () => {
    const itemsFromCart = localStorage.getItem("cart");
    if (itemsFromCart) {
      setItems(JSON.parse(itemsFromCart));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getItemsFromLocalStorage();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  });

  const handleOpen = useRef(() => {
    setOpen(true);
  });

  const handleClose = useRef(() => {
    setOpen(false);
  });

  return (
    <div className="min-h-screen bg-slate-400">
      <Navbar
        items={items}
        isLogin={isLogin}
        onLoginClick={handleOpen.current}
        onLogoutClick={handleOnSubmitLogout}
      />
      <Outlet />
      <LoginModal
        handleOnSubmit={handleOnSubmitLogin}
        isOpen={isOpen}
        handleClose={handleClose.current}
        handleOpen={handleOpen.current}
      />
    </div>
  );
};

export default Homepage;
