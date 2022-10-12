import styled from 'styled-components';

export const Container = styled.div`
  font-family: Poppins, sans-serif;
  background-color: #060d15;
  display: flex;
  width: 100%;
  height: 8.9vh;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 450px) {
    /* flex-direction: column; */
  }
`;

export const ContainerSearch = styled.div`
  font-family: Poppins, sans-serif;
  /* background-color: #060d15; */
  /* width: 50vw; */
  /* height: 7vh; */
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
`;

export const InputSearchBar = styled.input`
  width: 80%;
  /* margin-top: 1%; */
  margin-right: 3%;
  padding: 14px;
  border: 1px solid gray;
  border-radius: 10px;
  font-size: 16px;
  background-color: white;
`

export const Logo = styled.img`
  width: 9%;
  /* margin-left: 4%; */
  cursor: pointer;
  @media (max-width: 1024px) {
    width: 7rem;
  }
`;

export const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    color: #ec1d24;
    font-size: 1.5rem;
    color: #ec1d24;
    cursor: pointer;
    transition: all 0.5s;
    border-bottom: 2px solid transparent;
  }

  h3:hover {
    color: #e8aa3b;
    border-bottom: 2px solid #772720;
  }
`;

export const Button = styled.button`
  border: 2px solid blue;
  font-size: 16px;
  padding: 4px;
  border-radius: 15px;
  margin-top: 1%;
  on:hover {
    background-color: lightblue;
  }
`;
