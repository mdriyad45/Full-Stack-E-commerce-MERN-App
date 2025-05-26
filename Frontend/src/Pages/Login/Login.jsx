import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {loginIcons} from "../../assests/signin.gif";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import Context from "../../Context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {fetchUserDetails,fetchAddToCartCount} = useContext(Context);


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/');
      fetchUserDetails();
      fetchAddToCartCount();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }

  };
  return (
    <section id="id">
      <div className="continer mx-auto p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-4">
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  className="w-full outline-none bg-transparent h-full"
                  type="email"
                  value={data.email}
                  name="email"
                  onChange={handleOnChange}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="grid">
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  className="w-full outline-none bg-transparent h-full"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  placeholder="Enter your password"
                />
                <div
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password
              </Link>
            </div>

            <button className="bg-red-500 text-white font-semibold w-full max-w-[150px] rounded-full px-6 py-2 mt-6 mx-auto block hover:scale-110 hover:bg-red-700 transition-all">
              Login
            </button>
          </form>
          <p className="my-4">
            Don&#39;t have account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-500 hover:text-red-700 hover:underline"
            >
              Sing up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
