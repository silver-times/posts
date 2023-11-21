import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error } = useSignup();

  const handleSubmit = async () => {
    await signup(email, firstName, lastName, password);
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover "></div>
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
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First name
            </label>
            <input
              type="text"
              value={firstName}
              placeholder="First name"
              onChange={(event) => setFirstName(event.target.value)}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              placeholder="Last name"
              onChange={(event) => setLastName(event.target.value)}
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
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="my-4 block w-full px-4 py-4 bg-primary hover:bg-heading border-2 hover:text-primary rounded-lg text-2xl text-white "
            >
              Sign up
            </button>
            {error && <p className="text-warning">{error}</p>}
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
