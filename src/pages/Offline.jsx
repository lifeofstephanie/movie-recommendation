import offline from "../assets/images (1).jpeg";
export const Offline = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center items-center">
        <img src={offline} alt="no-connection" />
      </div>
      {/* <h1 className="text-blue-700 text-2xl">You are offline</h1> */}
      {/* <p>Please check your internet connection</p> */}
    </div>
  );
};
