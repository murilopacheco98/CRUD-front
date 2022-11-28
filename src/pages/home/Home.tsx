import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/navbar/Navbar";
import { Tabela } from "../../components/tabelaCompleta/TabelaCompleta";
import { useAppSelector } from "../../store/hooks";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const user = Object.values(useAppSelector((store) => store.users.entities));
  useEffect(() => {
    if (user[0]) {
      if (!user[0].authToken) {
        navigate("/");
        // alert("Token expirado");
      }
    } else {
      navigate("/");
      // alert("Token expirado");
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
