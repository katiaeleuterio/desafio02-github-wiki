import { useState } from "react";
import gitLogo from "../assets/github.png";
import Input from "../components/Input";
import Button from "../components/Button";
import ItemRepo from "../components/ItemRepo";

import { api } from "../services/api";
import { Container } from "./styles";

function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    await api
      .get(`repos/${currentRepo}`)
      .then(function (response) {
        const isExist = repos.find((repo) => repo.id === response.data.id);

        if (!isExist) {
          setRepos((prev) => [...prev, response.data]);
          setCurrentRepo("");
          return;
        }
      })
      .catch(function () {
        alert("Repositório não encontrado");
      });
  };

  const handleRemoveRepo = (id) => {
    const reposFiltered = repos.filter((repo) => repo.id !== id);
    setRepos(reposFiltered);
  };

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="gitHub logo" />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => (
        <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;
