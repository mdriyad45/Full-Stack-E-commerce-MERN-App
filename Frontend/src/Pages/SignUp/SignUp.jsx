import { FaEye, FaEyeSlash } from "react-icons/fa6";
import loginIcons from "../../assets/signin.gif";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../../Helper/imageToBase64 ";
import SummaryApi from "../../common";
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState([
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePic: ""
    },
  ]);

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(data.password === data.confirmPassword){

      const dataResponse = await fetch(SummaryApi.signUp.url,{
          method: SummaryApi.signUp.method,
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(data),
      })
      const dataApi = await dataResponse.json();
      console.log(dataApi);


      if(dataApi.success){
        toast.success(dataApi.message);
        navigate('/login');
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
    }else{
      toast.error("please check password and confirm password'")
    }

  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic = (e) =>{
    const file = e.target.files[0];
    imageToBase64(file)
    .then((imageToBase64=>{
        const imagePic = imageToBase64;
        setData((preve)=>{
            return {
                ...preve,
                profilePic: imagePic
            }
        })
    }))
    .catch(error => console.log(error))
    
  }
  return (
    <section id="id">
      <div className="continer mx-auto p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="bg-slate-300 text-center text-xs pb-4 pt-4 cursor-pointer absolute w-full bottom-0 bg-opacity-80 ">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic}/>
              </label>
            </form>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-4">
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  className="w-full outline-none bg-transparent h-full"
                  type="text"
                  value={data.name}
                  name="name"
                  onChange={handleOnChange}
                  placeholder="Enter your Name"
                />
              </div>
            </div>
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
            </div>
            <div className="grid">
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  className="w-full outline-none bg-transparent h-full"
                  type={showConfirmPassword ? "text" : "password"}
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  placeholder="Enter your confirm password"
                />
                <div
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  className="cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash></FaEyeSlash>
                  ) : (
                    <FaEye></FaEye>
                  )}
                </div>
              </div>
            </div>

            <button className="bg-red-500 text-white font-semibold w-full max-w-[150px] rounded-full px-6 py-2 mt-6 mx-auto block hover:scale-110 hover:bg-red-700 transition-all">
              Sign Up
            </button>
          </form>
          <p className="my-4">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="text-red-500 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
