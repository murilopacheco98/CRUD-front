import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { TabelaSearch } from "../../components/tabelaSearch/TabelaSearch";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { ClipLoader } from "react-spinners";

const HomeSearch: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const user = Object.values(useAppSelector((store) => store.users.entities));

  useEffect(() => {
    if (user[0] == undefined) {
      navigate("/");
    }
  }, []);

  return (
    <div className="mb-[60px]">
      {loading && (
        <div className="absolute w-[100%] h-[100%] items-center flex justify-center items-center z-10">
          <ClipLoader color={"#bdbecd"} size={60} />
        </div>
      )}
      <Navbar user={user[0]} />
      <TabelaSearch setLoading={setLoading} />
    </div>
  );
};

export default HomeSearch;
