import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovedView = () => {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOCUMENT_SERVICE_URL}/documents`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDocuments(response.data);
    } catch (err) {
      alert("Error fetching documents");
    }
  };

  const approveDocument = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_DOCUMENT_SERVICE_URL}/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Document approved successfully");
    } catch (err) {
      alert("Error approving document");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);
  return (
    <div>
      <h2>Approve Documents</h2>
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id}>
              <p>{doc.filename}</p>
              <p>Status :{doc.status}</p>
              {doc.status === "Pending" && (
                <button onClick={(e) => approveDocument(doc._id)}>
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No document to approve</p>
      )}
    </div>
  );
};

export default ApprovedView;
