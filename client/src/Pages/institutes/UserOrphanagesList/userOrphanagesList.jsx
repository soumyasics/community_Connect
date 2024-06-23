import CommunityHeader from "../../../Components/Common/CommunityHeader/CommunityHeader";
import UserFooter from "../../../Components/Common/UserFooter/userFooter";
import UserNavbar from "../../../Components/User/UserNavbar/userNavbar";
import doSomethingImg from "../../../Assets/Images/orp-teady-bear.png";
import OrphanagesTableList from "../../../Components/Common/OrphanagesTableList/orphanagesTableList";
import OrphanageNavbar from "../../../Components/Orphanage/OrphanageNavbar/orphanageNavbar";
import "./userOrphanagesList.css";

const UserOrphanagesList = ({ activeUser }) => {
  // rendering navbar based on the active user
  const renderNavbar = () => {
    switch (activeUser) {
      case "orphanage":
        return <OrphanageNavbar />;
      default:
        return <UserNavbar />;
    }
  };
  return (
    <div>
      {renderNavbar()}
      <CommunityHeader
        imgPath={doSomethingImg}
        textColor="black"
        description=""
      />
      <OrphanagesTableList activeUser={activeUser}/>
      <UserFooter />
    </div>
  );
};

export default UserOrphanagesList;
