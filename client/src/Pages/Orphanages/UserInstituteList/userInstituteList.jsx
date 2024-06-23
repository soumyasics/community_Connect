import CommunityHeader from "../../../Components/Common/CommunityHeader/CommunityHeader";
import UserFooter from "../../../Components/Common/UserFooter/userFooter";
import UserNavbar from "../../../Components/User/UserNavbar/userNavbar";
import doSomethingImg from "../../../Assets/Images/orp-teady-bear.png";
import OrphanagesTableList from "../../../Components/Common/OrphanagesTableList/orphanagesTableList";
import OrphanageNavbar from "../../../Components/Orphanage/OrphanageNavbar/orphanageNavbar";
import InstituteTableList from "../../../Components/Common/InstituteTableList/instituteTableList";
import bookStackImg from "../../../Assets/Images/books-stack.jpg";
const UserInstitutesList = ({ activeUser }) => {
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
        imgPath={bookStackImg}
        textColor="black"
        description=""
        heading=""
      />
      <InstituteTableList activeUser={activeUser} />
      <UserFooter />
    </div>
  );
};

export default UserInstitutesList;
