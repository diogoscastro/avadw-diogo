import { useState } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export const userDeleteDocument = (docCollection, docId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const deleteDocument = async () => {
    setLoading(true);

    try {
      const docRef = doc(db, docCollection, docId);

      await deleteDoc(docRef);

      setResponse({
        success: true,
        message: "Documento excluído com sucesso.",
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
      setResponse({ success: false, message: "Erro ao excluir o documento." });
    }

    setLoading(false);
  };

  return {
    deleteDocument,
    loading,
    error,
    response,
  };
};
