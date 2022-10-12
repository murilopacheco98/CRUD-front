import React from "react";
import Header from "../../components/navbar/Navbar";
import { Tabela } from "../../components/table/TabelaCompleta";

const Home: React.FC = () => {
  return (
      <>
        <Header/>
        <Tabela />
      </>
   );
};

export default Home;
