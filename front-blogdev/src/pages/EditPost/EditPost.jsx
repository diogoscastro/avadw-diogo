import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { userFetchDocument } from "../../hooks/userFetchDocument";
import { userUpdateDocument } from "../../hooks/userUpdateDocument";

function EditPost() {
  const { user } = useAuthValue();
  const { id } = useParams();
  const navigate = useNavigate();

  // Utilize a função userFetchDocument para obter os detalhes da postagem
  const { document, loading, error } = userFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  // Utilize a função userUpdateDocument para atualizar a postagem
  const { updateDocument, response } = userUpdateDocument("posts", id);

  useEffect(() => {
    // Se o usuário não estiver autenticado, redirecione para a página de login
    if (!user) {
      navigate("/login");
    }

    // Se o documento já foi carregado, preencha os estados do formulário
    if (document) {
      setTitle(document.title || "");
      setImage(document.image || "");
      setBody(document.body || "");
      setTags(document.tags ? document.tags.join(", ") : "");
    }
  }, [user, navigate, document]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL válida");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !tags || !body) {
      setFormError("Por favor, preencha com atenção todos os campos!");
    }

    if (formError) return;

    // Utilize a função updateDocument para atualizar a postagem
    updateDocument({
      title,
      image,
      body,
      tags: tagsArray,
    });
  };

  return (
    <div>
      <h2>Editar Postagem</h2>
      {loading && <p>Carregando postagem...</p>}
      {error && <p>Ocorreu um erro ao buscar a postagem: {error}</p>}
      {document && (
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            <span>URL da imagem:</span>
            <input
              type="text"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Conteúdo da Postagem:</span>
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Tags:</span>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </label>
          {!response.loading && (
            <button type="submit">Atualizar Postagem</button>
          )}
          {response.loading && (
            <button type="submit" disabled>
              Atualizando...
            </button>
          )}
          {response.error && (
            <p className="error">{response.error || formError}</p>
          )}
        </form>
      )}
    </div>
  );
}

export default EditPost;
