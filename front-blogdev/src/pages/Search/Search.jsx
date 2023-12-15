import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { userFetchDocuments } from "../../hooks/userFetchDocuments";

function Search() {
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      // Se a barra de pesquisa estiver vazia, talvez você queira exibir uma mensagem ou impedir a pesquisa.
      return;
    }

    // Use a função userFetchDocuments para buscar postagens com base nas tags
    const { documents, error } = await userFetchDocuments(
      "posts",
      searchTerm.toLowerCase()
    );

    if (error) {
      console.error(error);
      // Lide com o erro, se necessário.
    } else {
      setSearchResults(documents);
    }
  };

  const handleNavigateToPost = (postId) => {
    // Navegue para a página de detalhes da postagem ou para onde for apropriado em seu aplicativo
    navigate(`/post/${postId}`);
  };

  return (
    <div>
      <h2>Buscar Postagens</h2>
      <input
        type="text"
        placeholder="Pesquisar por tags"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        Pesquisar
      </button>
      {searchResults && (
        <ul>
          {searchResults.map((post) => (
            <li key={post.id} onClick={() => handleNavigateToPost(post.id)}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>Tags: {post.tags.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
