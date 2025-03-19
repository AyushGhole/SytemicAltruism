import { useState } from "react";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      {isLogin ? (
        <Login toggleAuth={toggleAuth} />
      ) : (
        <Signup toggleAuth={toggleAuth} />
      )}
    </>
  );
};

export default Home;
