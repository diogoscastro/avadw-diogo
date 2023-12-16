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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      try {
        const collectionRef = collection(db, docCollection);

        let q;

        if (search) {
          q = query(
            collectionRef,
            orderBy("createdAt", "desc"),
            where("tags", "array-contains", search)
          );
        } else if (uid) {
          q = query(
            collectionRef,
            orderBy("createdAt", "desc"),
            where("uid", "==", uid)
          );
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"));
        }

        console.log("Query:", q);

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          console.log(
            "Query Snapshot:",
            querySnapshot.docs.map((doc) => doc.data())
          );
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.error("Fetch Data Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [docCollection, search, uid]);

  return {
    documents,
    loading,
    error,
  };
};
