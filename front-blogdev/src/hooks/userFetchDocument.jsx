import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const userFetchDocument = (docCollection, id) => {
  // Renomeia para useFetchDocument
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Inicia com loading como true

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const docRef = doc(db, docCollection, id); // Corrige a criação da referência ao documento
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocument({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Documento não encontrado.");
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [docCollection, id]);

  return {
    document,
    loading,
    error,
  };
};
