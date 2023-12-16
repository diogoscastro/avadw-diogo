import React from "react";
import { useQuery } from "../../hooks/useQuery";
import { userFetchDocuments } from "../../hooks/userFetchDocuments";
import { Link } from "react-router-dom";
import PostDetail from "../../components/PostDetail";
import styles from "./Search.module.css";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = userFetchDocuments("posts", search);
  return (
    <div className={styles.search_container}>
      <h1>Resultados encontrados para: {search}</h1>
      <div>
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados</p>
            <Link to="/">Voltar a home</Link>
          </>
        )}
        {posts &&
          posts.map((post) => <PostDetail key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
