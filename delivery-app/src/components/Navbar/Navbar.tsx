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
              <a>Homepage</a>
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
        <div className="dropdown dropdown-left mr-4">
          <label tabIndex={0} className="btn btn-primary rounded-btn">
            Cart
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
