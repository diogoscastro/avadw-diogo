import { useState } from "react";
import { useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const userDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const deleteDocument = await deleteDoc(doc(db, docCollection, id));
      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deleteDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", error });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  return { deleteDocument, response };
};
