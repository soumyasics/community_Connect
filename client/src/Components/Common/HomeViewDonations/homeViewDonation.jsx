import { Table } from "react-bootstrap";
import BlueButton from "../../TiniComponents/BlueButton/blueButton";
import "./homeViewDonation.css";


const HomeViewDonations = () => {
  const donationsData = [
    {
      id: 1,
      orphanageName: "ABCD",
      date: "2022-11-11",
      donatedBy: "Steve",
      donatedAmount: "1000",
    },
    {
      id: 2,
      orphanageName: "DEFG",
      date: "2023-1-11",
      donatedBy: "Elon Musk",
      donatedAmount: "2000",
    },
    {
      id: 3,
      orphanageName: "IJKL",
      date: "2023-1-11",
      donatedBy: "Jeff ",
      donatedAmount: "3000",
    },
  ];
  return (
    <div className="home-view-donation-container">
      <h3> Donations</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Orphanage Name</th>
            <th>Date</th>
            <th>Donated By</th>
            <th>Donated Amout</th>
          </tr>
        </thead>
        <tbody>
          {donationsData.length > 0 &&
            donationsData.map((donation) => {
              return (
                <tr key={donation.id}>
                  <td>{donation.id}</td>
                  <td>{donation.orphanageName}</td>
                  <td>{donation.date}</td>
                  <td>{donation.donatedBy}</td>
                  <td>{donation.donatedAmount}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <BlueButton btnContent="View More"/>
    </div>
  );
};
export default HomeViewDonations;
