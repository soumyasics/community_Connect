import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosInstance from "../../../api/BaseUrl";
import { useNavigate } from "react-router-dom";
import "./instituteTableList.css";
const InstituteTableList = ({ activeUser }) => {
  const [instituteList, setInstituteList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllInsList();
  }, []);

  const getAllInsList = async () => {
    try {
      const res = await axiosInstance.get("institute/get-all-institutions");
      const lists = res?.data?.data;
      if (lists.length > 0) {
        setInstituteList(lists);
      }
    } catch (error) {
      console.error("error on get all orphanages", error);
    }
  };



  if (instituteList.length === 0) {
    return (
      <div className="m-5 p-5">
        <h1>No Institutes found.</h1>
      </div>
    );
  }

  return (
    <div className="orphanges-table-lists">
      <h1> Listed Institutes </h1>
      <Table striped bordered hover id="orphanages-table-container">
        <thead>
          <tr>
            <th>No</th>
            <th>Institute Name</th>
            <th>Year of Establishment</th>
            <th>City</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody>
          {instituteList.length > 0 &&
            instituteList.map((orp, index) => {
              return (
                <tr key={orp._id}>
                  <td>{index + 1}</td>
                  <td>{orp.name}</td>
                  <td>{orp.yearOfEstablishment}</td>
                  <td>{orp.city}</td>
                  <td>{orp.phoneNumber}</td>
                  
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default InstituteTableList;
