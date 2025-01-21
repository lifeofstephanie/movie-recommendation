import React, { useState } from "react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { Icons } from "../components/ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth"; 

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const navigate = useNavigate();

  const passwordValidators = {
    length: (password) => password.length >= 8,
    uppercase: (password) => /[A-Z]/.test(password),
    lowercase: (password) => /[a-z]/.test(password),
    number: (password) => /\d/.test(password),
    specialChar: (password) => /[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]/.test(password),
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordRequirements({
      length: passwordValidators.length(value),
      uppercase: passwordValidators.uppercase(value),
      lowercase: passwordValidators.lowercase(value),
      number: passwordValidators.number(value),
      specialChar: passwordValidators.specialChar(value),
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    if (!Object.values(passwordRequirements).every((req) => req)) {
      toast.error('Password must be at least 8 characters long, and include uppercase, lowercase, numbers, and special characters.');
      setIsLoading(false);
      return; 
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      toast.success('Sign-Up Successful');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={handleSignup} className="space-y-6">
        <div className="rounded-md shadow-sm space-y-2 text-black">
          <div>
            <label htmlFor="full-name" className="sr-only">
              Full Name
            </label>
            <input
              id="full-name"
              name="name"
              type="text"
              autoComplete="full-name"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm h-[50px]"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm h-[50px]"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded-md relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm h-[50px]"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="mt-2 text-sm">
              <ul className="space-y-1">
                {Object.keys(passwordRequirements).map((req, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center ${passwordRequirements[req] ? "text-green-500" : "text-red-500"}`}
                  >
                    <span className="mr-2">
                      {passwordRequirements[req] ? "✔" : "✘"}
                    </span>
                    {req === "length" && "At least 8 characters"}
                    {req === "uppercase" && "At least one uppercase letter"}
                    {req === "lowercase" && "At least one lowercase letter"}
                    {req === "number" && "At least one number"}
                    {req === "specialChar" && "At least one special character"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded bg-gray-800"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            disabled={isLoading}
          >
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign up
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="font-medium text-blue-400 hover:text-blue-300">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
