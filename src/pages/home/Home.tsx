import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import { Tabela } from "../../components/tabelaCompleta/TabelaCompleta";
import { useAppSelector } from "../../store/hooks";
import { ClipLoader } from "react-spinners";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const user = Object.values(useAppSelector((store) => store.users.entities));

  useEffect(() => {
    if (user[0] == undefined) {
      navigate("/");
    }
  }, []);

  return (
    <div className="mb-[50px]">
      {loading && (
        <div className="absolute w-[100%] h-[100%] items-center flex justify-center items-center z-10">
          <ClipLoader color={"#bdbecd"} size={60} />
        </div>
      )}
      <Navbar user={user[0]} />
      <Tabela setLoading={setLoading} />
    </div>
  );
};
