import { useState } from "react";
import ROLE from "../../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, onClose,userId,callFac }) => {
    console.log(name, email, role, userId)
  const [userRole, setUserRole] = useState(role);

  const handleOnchangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updatedUser.url, {
      method: SummaryApi.updatedUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        role: userRole,
        userId: userId 
    }),
    });
    
    const responseData = await fetchResponse.json();

    if(responseData){
        toast.success(responseData.message);
        onClose();
        callFac();
    }

    console.log("role updated: ", responseData);
  };

  return (
    <div className="absolute w-full h-full top-16 z-10 flex justify-center items-center bg-slate-200 bg-opacity-55">
      <div className="max-auto bg-white shadow-md p-5 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose></IoMdClose>
        </button>

        <h1>Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <div className="flex justify-between items-center my-4">
          <p>Role</p>
          <select
            className="border px-3 py-1"
            value={userRole}
            onChange={handleOnchangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto block border rounded-full px-3 py-2 bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role{" "}
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
