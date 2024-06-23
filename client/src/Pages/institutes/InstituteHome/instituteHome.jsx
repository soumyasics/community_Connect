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
import { useEffect } from "react";
import InstituteNavbar from "../../../Components/Institutes/InstitutesNavbar/instituteNavbar";
import CarouselFadeExample from "../../../Components/Common/insHomeCarousels/carousels";
import InstituteGirlImg from "../../../Assets/Images/ins-student-smile.jpg";
const InstituteHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const contributeHeading = "Empowering Futures";
  const contributeContent = `Unlock Potential, Educate Minds, Shape Tomorrow's Leaders. By investing in education, we empower individuals to reach their full potential, fostering a brighter and more promising future for all.`;

  const btnContent = null;
  const childContentHeading = "Nurturing Dreams, Inspiring Futures";
  const childContent =
    "Each child is a unique story of resilience and hope. Surrounded by love and support, these young souls embark on a journey of healing and growth.";
  const communityContent = "Community help fosters a spirit of unity";
  const communityContentHeading = "Fostering Unity";
  return (
    <div>
      <InstituteNavbar />
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
        imgPath={InstituteGirlImg}
        content={communityContent}
        heading={communityContentHeading}
        buttonContent={btnContent}
      />
      <TextCenterQuote />
      <UserFooter />
    </div>
  );
};
export default InstituteHome;
