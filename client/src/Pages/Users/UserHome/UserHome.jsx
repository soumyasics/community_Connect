import UserNavbar from "../../../Components/User/UserNavbar/userNavbar";
import CommunityHeader from "../../../Components/Common/CommunityHeader/CommunityHeader";
import { FaUserAstronaut } from "react-icons/fa";
import TextCenterComponent from "../../../Components/Common/TextCenterComponent/textCenterComponent";
import TextRightComponent from "../../../Components/Common/TextRightComponent/textRightComp";
import bloodDonationImg from "../../../Assets/Images/blood-donation-img.png";
import TextLeftComponent from "../../../Components/Common/TextLeftComponent/textLeftComponent";
import charityImg from "../../../Assets/Images/charity-img.png";
import HomeViewDonations from "../../../Components/Common/HomeViewDonations/homeViewDonation";
import UserFooter from "../../../Components/Common/UserFooter/userFooter";
import TextCenterQuote from "../../../Components/Common/TextCenterQuote/textCenterQuote";
import ambulanceImg from "../../../Assets/Images/ambulance-img.png";
import CarouselFadeExample from "../../../Components/Common/homeCarousels/carousels";
import { useEffect } from "react";
const UserHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const bloodDonationHeading = "Blood Camps";
  const bloodDonationContent =
    "Blood donation is the real act of humanity. It is a simple gesture that can make a huge difference in someone’s life.";
  const bloodDonationBtnContent = "View Camps";
  const contributeHeading = "How can you contribute us?";
  const contributeContent =
    "We are a humanitarian initiative committed to making a positive impact on the world. Based on the principles of empathy, solidarity, and sustainable development, we strive to address the most pressing challenges facing communities in Trivandrum";

  const donationHeading = "Donate Money";
  const donationContent =
    "Here you can view various donation requests from orphanages located in Trivandrum. You can contribute by donating money through our platform";
  const donationBtnContent = "View Requests";
  return (
    <>
      <UserNavbar />
      <CarouselFadeExample />
      <CommunityHeader />
      <TextCenterComponent
        heading={contributeHeading}
        textContent={contributeContent}
      />
      <TextRightComponent
        imgPath={ambulanceImg}
        content={bloodDonationContent}
        heading={bloodDonationHeading}
        buttonContent={bloodDonationBtnContent}
      />

      <TextLeftComponent
        imgPath={charityImg}
        content={donationContent}
        heading={donationHeading}
        buttonContent={donationBtnContent}
      />

      {/* <HomeViewDonations /> */}
      <TextCenterQuote />
      <UserFooter />
    </>
  );
};
export default UserHome;
