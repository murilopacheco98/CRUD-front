import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/navbar/Navbar";
import { Tabela } from "../../components/tabelaCompleta/TabelaCompleta";
import { useAppSelector } from "../../store/hooks";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const user = Object.values(useAppSelector((store) => store.users.entities));
  useEffect(() => {
    console.log("1");
    if (user[0]) {
      console.log("2");
      if (!user[0].authToken) {
        console.log("3");
        navigate("/");
        alert("Token expirado");
      }
    } else {
      navigate("/");
      alert("Token expirado");
    }
  }, []);

  return (
    <>
      <Header />
      <Tabela />
    </>
  );
};

export default Home;
