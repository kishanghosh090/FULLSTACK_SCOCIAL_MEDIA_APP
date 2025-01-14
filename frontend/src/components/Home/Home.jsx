import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/v1/user/`)
      .then((res) => {
        console.log(res);
        setIsOpen(true);
        return;
      })
      .catch((error) => {
        console.log(error);
        navigate("/login", { replace: true });
        return;
      });
  });
  return (
    <>
      {isOpen && (
        <div>
          <h1>Home Page</h1>
        </div>
      )}
    </>
  );
}

export default Home;
