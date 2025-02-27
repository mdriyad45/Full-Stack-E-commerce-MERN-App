import { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {Link, Outlet, useNavigate} from 'react-router-dom'
import ROLE from "../../common/role";


const AdminPanel = () => {
    const user = useSelector(state=> state?.user.user);
    const nagivate = useNavigate();
    
    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            nagivate('/')
        }
    },[user])
    return (
        <div className="min-h-[calc(100vh-120px)] hidden md:flex">
            <aside className="bg-white max-w-60 w-full min-h-full customShadow">
                <div className="h-32 flex justify-center items-center flex-col">
                    <div className="text-5xl cursor-pointer relative flex justify-center">
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} alt={user?.name} className="w-20 h-20 rounded-full"/>
                            ) : (
                                <FaRegCircleUser></FaRegCircleUser>
                            )
                        }
                    </div>
                    <p className=" capitalize text-lg font-semibold">{user?.name}</p>
                    <p className=" capitalize text-sm">{user?.role}</p>
                </div>

                {/*navigation*/}
                
                <div>
                    <nav className="grid p-4">
                        <Link to={'all-users'} className="px-2 py-1 hover:bg-slate-100">All users</Link>
                        <Link to={'all-products'} className="px-2 py-1 hover:bg-slate-100">Products</Link>
                    </nav>
                </div>
            </aside>
            <main className="w-full h-full p-2">
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AdminPanel;