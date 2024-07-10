import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";



const Signup = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [accountType, setAccountType] = useState("buyer"); // Set default value to "buyer"
  const [avatar, setAvatar] = useState();

  const handleSignup = async (e) => {
    e.preventDefault();    


    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullName", fullName);
    formData.append("accountType", accountType);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Handle success response
      toast.success("User created successfully");
      navigate("/login"); // Navigate to login page

      // Reset form fields
  setUsername("");
  setEmail("");
  setPassword("");
  setFullName("");
  setAccountType("");
  setAvatar(null);
    } catch (error) {
      console.error(error.response.data); // Log the error response
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="mt-20 sm:mt-10 min-h-screen flex items-center justify-center w-full ">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27vw]">
        <h1 className="text-2xl font-bold text-center mb-4">Let's Connect!</h1>
        <form onSubmit={handleSignup}>
          {/* For username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Vishal1523"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          {/* For email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          {/* fullName */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Vishal Sahu"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          {/* profile image  */}
          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Profile Image
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              accept="image/*"
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          {/* For password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          {/* For account selection */}
          <div className="mb-4">
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Your Accont Type
            </label>
            <select
              onChange={(e) => setAccountType(e.target.value || "buyer")}
              name="accountType"
              defaultValue="buyer" // Set default value to "buyer"
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {/* Login with account */}
          <div className="flex items-center justify-end mb-4">
            <Link className="text-xs text-black " to="/login">
              Log In With Account
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-black "
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
