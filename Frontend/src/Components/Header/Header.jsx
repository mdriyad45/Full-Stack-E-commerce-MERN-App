import { FaRegCircleUser } from "react-icons/fa6";
import Logo from "../Logo/Logo";
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../../Store/userSlice";
import { useState } from "react";
import ROLE from "../../common/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleLogout = async () => {
    console.log("logout successfull");
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    console.log("logout data", data);

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }

    if (data.error) {
      toast.error(data.message);
    }
  };
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={100} h={100}></Logo>
          </Link>
        </div>

        <div className="hidden lg:flex w-full max-w-sm  items-center justify-between border rounded-full focus-within:shadow-md">
          <input
            className="w-full outline-none pl-2"
            type="text"
            placeholder="search product here..."
          />
          <div className="bg-red-500 text-xl text-white rounded-r-full min-w-[50px] h-8 flex items-center justify-center">
            <GrSearch></GrSearch>
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative  flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => {
                  setMenuDisplay((preve) => !preve);
                }}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser></FaRegCircleUser>
                )}
              </div>
            )}
            {menuDisplay && (
              <div className=" absolute bg-white h-fit p-2 shadow-lg rounded bottom-0 top-11 ">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover: bg-slate-100 p-2"
                    >
                      Admin panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div className="text-3xl relative">
            <span>
              <FaShoppingCart></FaShoppingCart>
            </span>
            <div className="bg-red-700 flex items-center justify-center rounded-full w-6 h-5 absolute -top-2 -right-2">
              <p className="text-sm text-white">0</p>
            </div>
          </div>

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700"
              >
                LogOut
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
Header;
