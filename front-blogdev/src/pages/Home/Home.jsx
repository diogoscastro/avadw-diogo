import React from "react";
import Search from "./Search";
import { useAuthValue } from "../../context/AuthContext";
import { userFetchDocuments } from "../../hooks/userFetchDocuments";

function Home() {
  const { user } = useAuthValue();

  // Use a função userFetchDocuments para buscar todas as postagens
  const { documents, loading, error } = userFetchDocuments("posts");

  return (
    <div>
      <h1>Bem-vindo à Página Inicial</h1>

      {/* Adicione o componente Search aqui */}
      <Search />

      {/* Lista de postagens */}
      {loading && <p>Carregando postagens...</p>}
      {error && <p>Ocorreu um erro ao buscar as postagens: {error}</p>}
      {documents && (
        <ul>
          {documents.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>Por: {post.createBy}</p>
              <p>{post.body}</p>
              <p>Tags: {post.tags.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
