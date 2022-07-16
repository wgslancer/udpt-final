import { Link, useNavigate } from "react-router-dom";
import ItemCart from "../common/ItemCart";

interface NavBarProps {
  isLogin: boolean;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  items: Array<{
    id: number;
    name: string;
    amount: number;
    price: string;
  }>;
}

const Navbar = ({
  onLoginClick,
  isLogin,
  onLogoutClick,
  items,
}: NavBarProps) => {
  const navigate = useNavigate();
  const handleClickCheckout = () => {
    if (!isLogin) {
      onLoginClick?.();
    } else {
      navigate("/checkout");
    }
  };
  const handleOnClickLogin = () => {
    onLoginClick?.();
  };
  const handleOnClickLogout = () => {
    onLogoutClick?.();
  };

  return (
    <div className="navbar bg-base-100 shadow-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/current-order">Current Order</Link>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-left mr-4 flex-center-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content p-2 shadow bg-base-100 rounded-box mt-4"
          >
            {items.map((item) => {
              const { amount, id, name, price } = item;
              return (
                <li key={`item-cart-${id}`}>
                  <ItemCart amount={amount} name={name} price={price} />
                </li>
              );
            })}
            <li>
              <button
                className="btn btn-primary mt-4"
                onClick={handleClickCheckout}
              >
                Go to checkout
              </button>
            </li>
          </ul>
        </div>
        {isLogin ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </span>
              </li>
              <li>
                <span>Settings</span>
              </li>
              <li>
                <span onClick={handleOnClickLogout}>Logout</span>
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn" onClick={handleOnClickLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
