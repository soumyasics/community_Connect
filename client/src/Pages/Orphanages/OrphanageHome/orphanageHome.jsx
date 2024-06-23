// import OrphnageNavbar from "../../../Components/Orphanage/OrphanageNavbar/orphanageNavbar";

import CommunityHeader from "../../../Components/Common/CommunityHeader/CommunityHeader";
import OrphanageNavbar from "../../../Components/Orphanage/OrphanageNavbar/orphanageNavbar";
import beTheChangeImg from "../../../Assets/Images/user-landing-after-login.png";
import leafHederImg from "../../../Assets/Images/leaf-img-header.png";
import childImg from "../../../Assets/Images/childrens.jpg";
import orphanageImg2 from "../../../Assets/Images/orp-4.png";
import volunteerImg from "../../../Assets/Images/volunteer-1.png";
import TextCenterComponent from "../../../Components/Common/TextCenterComponent/textCenterComponent";
import TextRightComponent from "../../../Components/Common/TextRightComponent/textRightComp";
import "./orphanageHome.css";
import TextLeftComponent from "../../../Components/Common/TextLeftComponent/textLeftComponent";
import HomeViewDonations from "../../../Components/Common/HomeViewDonations/homeViewDonation";
import TextCenterQuote from "../../../Components/Common/TextCenterQuote/textCenterQuote";
import UserFooter from "../../../Components/Common/UserFooter/userFooter";
import CarouselFadeExample from "../../../Components/Common/homeCarousels/carousels";
import { useEffect } from "react";
const OrphanageHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const contributeHeading = "Making a Meaningful Impact";
  const contributeContent = `Charity is a powerful force that brings positive change to both individual     By engaging in acts of kindness and generosity, we not only uplift those in need but also contribute to building a more compassionate and harmonious society. `;

  const btnContent = null;
  const childContentHeading = "Nurturing Dreams, Inspiring Futures";
  const childContent =
    "Each child is a unique story of resilience and hope. Surrounded by love and support, these young souls embark on a journey of healing and growth.";
  const communityContent = "Community help fosters a spirit of unity";
  const communityContentHeading = "Fostering Unity";
  return (
    <div>
      <OrphanageNavbar />
      <CarouselFadeExample />
      <CommunityHeader imgPath={leafHederImg} />
      <TextCenterComponent
        heading={contributeHeading}
        textContent={contributeContent}
        buttonContent={null}
      />
      <TextRightComponent
        imgPath={childImg}
        heading={childContentHeading}
        content={childContent}
        buttonContent={btnContent}
      />

      <TextLeftComponent
        imgPath={orphanageImg2}
        content={communityContent}
        heading={communityContentHeading}
        buttonContent={btnContent}
      />
      <TextCenterQuote />
      <UserFooter />
    </div>
  );
};
export default OrphanageHome;
