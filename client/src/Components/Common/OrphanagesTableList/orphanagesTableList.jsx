import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosInstance from "../../../api/BaseUrl";
import { useNavigate } from "react-router-dom";
import "./orphanagesTableList.css";
const OrphanagesTableList = ({ activeUser }) => {
  const [orphanagesList, setOrphanagesList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllOrphanagesList();
  }, []);

  const getAllOrphanagesList = async () => {
    try {
      const res = await axiosInstance.get("orphanage/get-all-orphanages");
      const lists = res?.data?.data;
      if (lists.length > 0) {
        setOrphanagesList(lists);
      }
    } catch (error) {
      console.error("error on get all orphanages", error);
    }
  };

  const redirectOrphanageDetails = (id) => {
    if (activeUser === "orphanage") {
      navigate("/orphanage/orphanage/" + id);
    } else {
      navigate("/user/orphanage/" + id);
    }
  };

  if (orphanagesList.length === 0) {
    return (
      <div className="m-5 p-5">
        <h1>No orphanages found.</h1>
      </div>
    );
  }

  return (
    <div className="orphanges-table-lists">
      <h1> Listed Orphanages </h1>
      <Table striped bordered hover id="orphanages-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Orphanage Name</th>
            <th>Year of Establishment</th>
            <th>City</th>
            <th>Contact No</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {orphanagesList.length > 0 &&
            orphanagesList.map((orp, index) => {
              return (
                <tr key={orp._id}>
                  <td>{index + 1}</td>
                  <td>{orp.name}</td>
                  <td>{orp.yearOfEstablishment}</td>
                  <td>{orp.city}</td>
                  <td>{orp.phoneNumber}</td>
                  <td>
                    <button
                      onClick={() => {
                        redirectOrphanageDetails(orp._id);
                      }}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default OrphanagesTableList;
