import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import { Tabela } from "../../components/tabelaCompleta/TabelaCompleta";
import { useAppSelector } from "../../store/hooks";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = Object.values(useAppSelector((store) => store.users.entities));

  useEffect(() => {
    if (user[0] == undefined) {
      navigate("/");
    }
  }, []);

  return (
    <div className="mb-[50px]">
      <Navbar user={user[0]} />
      <Tabela />
    </div>
  );
};
