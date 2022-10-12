import React from "react";
import Header from "../../components/navbar/Navbar";
import { TabelaSearch } from "../../components/tabelaSearch/TabelaSearch";

const Tabela: React.FC = () => {
  return (
      <>
        <Header/>
        <TabelaSearch />
      </>
   );
};

export default Tabela
