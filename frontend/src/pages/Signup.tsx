import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import SignupImage from "../assets/images/signup.png";

export const Signup = () => {
  const { signup } = useSignup();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await signup(
        formData.email,
        formData.firstName,
        formData.lastName,
        formData.password
      );
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-[60%] bg-cover "
          style={{ backgroundImage: `url(${SignupImage})` }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            POSTS
          </h2>
          <p className="text-lg text-gray-600 text-center">Welcome!</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <p className="text-xs text-center text-gray-500 uppercase">
              Signup with email
            </p>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={(event) => handleChange("email", event.target.value)}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First name
            </label>
            <input
              type="text"
              value={formData.firstName}
              placeholder="First name"
              onChange={(event) =>
                handleChange("firstName", event.target.value)
              }
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last name
            </label>
            <input
              type="text"
              value={formData.lastName}
              placeholder="Last name"
              onChange={(event) => handleChange("lastName", event.target.value)}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              type="password"
              value={formData.password}
              placeholder="Password"
              onChange={(event) => handleChange("password", event.target.value)}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="my-4 block w-full px-4 py-4 bg-black hover:bg-theme border-2 hover:text-white rounded-lg text-2xl text-white "
            >
              Signup
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <a href="/login" className="text-xs text-gray-500 uppercase">
              or login
            </a>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
