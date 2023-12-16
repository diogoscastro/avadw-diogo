import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { userFetchDocuments } from "../../hooks/userFetchDocuments";
import { userDeleteDocument } from "../../hooks/userDeleteDocument";
import styles from "./DashBoard.module.css";

const DashBoard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts } = userFetchDocuments("posts", null, uid);
  console.log(posts);
  console.log(uid);
  const { deleteDocument } = userDeleteDocument("posts");

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie suas postagens</p>

      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Você não tem tem postagem</p>
          <Link to="/post/create" className="btn">
            Criar Postagem
          </Link>
        </div>
      ) : (
        <div className={styles.post_header}>
          <span>Título</span>
          <span>Ações</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div>
            <p>{post.title}</p>
            <div className={styles.actions}>
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Ver
              </Link>
              <Link to={`/posts/edit${post.id}`} className="btn btn-outline">
                Editar
              </Link>
              <button
                onClick={() => deleteDocument(post.id)}
                className="btn btn-red"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DashBoard;
