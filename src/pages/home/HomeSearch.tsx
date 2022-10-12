import React from "react";
import Header from "../../components/navbar/Navbar";
import { TabelaSearch } from "../../components/tableSearch/TabelaSearch";

const Tabela: React.FC = () => {
  return (
      <>
        <Header/>
        <TabelaSearch />
      </>
   );
};

export default Tabela
