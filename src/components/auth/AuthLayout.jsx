import React from "react";
export function AuthLayout({ children, title, subtitle }) {
  return (
    <div
      className={`min-h-screen  text-white flex items-center justify-center px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-70 p-8 rounded-lg backdrop-blur-sm border border-gray-500/20 shadow-md ">
        <div>
          <h2 className="text-center text-3xl font-bold text-blue-700">
            {title}
          </h2>
          {/* <p className="mt-2 text-center text-sm text-purple-400">{subtitle}</p> */}
        </div>
        {children}
      </div>
    </div>
  );
}
