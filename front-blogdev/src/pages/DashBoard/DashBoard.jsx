import React, { useEffect, useState } from "react";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { userFetchDocuments } from "../../hooks/userFetchDocuments";
import { userDeleteDocument } from "../../hooks/userDeleteDocument";

function DashBoard() {
  const { user } = useAuthValue();
  const navigate = useNavigate();

  // Utilize a função userFetchDocuments para obter as postagens
  const { documents, loading, error } = userFetchDocuments(
    "posts",
    null,
    user.uid
  );

  useEffect(() => {
    // Se o usuário não estiver autenticado, redirecione para a página de login
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleDelete = (postId) => {
    const { deleteDocument } = userDeleteDocument("posts", postId);
    deleteDocument();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Search />

      {loading && <p>Carregando postagens...</p>}
      {error && <p>Ocorreu um erro ao buscar as postagens: {error}</p>}
      {documents && (
        <ul>
          {documents.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>Tags: {post.tags.join(", ")}</p>
              {user && user.uid === post.uid && (
                <button type="button" onClick={() => handleDelete(post.id)}>
                  Excluir
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashBoard;
