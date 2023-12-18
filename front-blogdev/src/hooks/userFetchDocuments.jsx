import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const userFetchDocuments = (
  docCollection,
  search = null,
  uid = null
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const collectionRef = collection(db, docCollection);

      try {
        let q;

        if (search) {
          q = query(
            collectionRef,
            orderBy("createAt", "desc"),
            where("tags", "array-contains", search)
          );
        } else if (uid) {
          q = query(
            collectionRef,
            orderBy("createAt", "desc"),
            where("uid", "==", uid)
          );
        } else {
          q = query(collectionRef, orderBy("createAt", "desc"));
        }

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const mappedDocs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDocuments(mappedDocs);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error(error);
        setError(error.message);
      }

      setLoading(false);
    };

    loadData();
  }, [docCollection, search, uid]);

  return {
    documents,
    loading,
    error,
  };
};
