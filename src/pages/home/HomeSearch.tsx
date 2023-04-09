import React, { useEffect } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { TabelaSearch } from "../../components/tabelaSearch/TabelaSearch";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const HomeSearch: React.FC = () => {
  const navigate = useNavigate();
  const user = Object.values(useAppSelector((store) => store.users.entities));

  useEffect(() => {
    if (user[0] == undefined) {
      navigate("/");
    }
  }, []);

  return (
    <div className="mb-[60px]">
      <Navbar user={user[0]} />
      <TabelaSearch />
    </div>
  );
};

export default HomeSearch;
