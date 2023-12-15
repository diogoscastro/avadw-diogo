import { useState } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export const userUpdateDocument = (docCollection, docId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const updateDocument = async (data) => {
    setLoading(true);

    try {
      const docRef = doc(db, docCollection, docId);

      await updateDoc(docRef, data);

      setResponse({
        success: true,
        message: "Documento atualizado com sucesso.",
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
      setResponse({
        success: false,
        message: "Erro ao atualizar o documento.",
      });
    }

    setLoading(false);
  };

  return {
    updateDocument,
    loading,
    error,
    response,
  };
};
