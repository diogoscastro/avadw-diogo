import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { userFetchDocument } from "../../hooks/userFetchDocument";
import { userUpdateDocument } from "../../hooks/userUpdateDocument";
import styles from "./EditPost.module.css";

const EditPost = () => {
  const { id } = useParams();

  const { document: post } = userFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      setTags(post.tags);

      const textTags = post.tags.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { updateDocument, response } = userUpdateDocument("posts");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar Postagem {post.title}</h2>
          <p>Aqui você pode alterar a sua postagem</p>
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
              <button className="btn" type="submit">
                Atualizar Postagem
              </button>
            )}
            {response.loading && (
              <button type="submit" disabled>
                Atualizando...
              </button>
            )}
            {(response.error || formError) && (
              <p className={styles.error}>{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
