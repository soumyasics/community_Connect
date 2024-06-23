import UserNavbar from "../../../User/UserNavbar/userNavbar";
import CommunityHeader from "../../CommunityHeader/CommunityHeader";
import UserFooter from "../../UserFooter/userFooter";
const TermsConditions = () => {
  return (
    <div>
      <UserNavbar />
      <CommunityHeader />
      <div className="w-75 mx-auto p-5" style={{ minHeight: "300px" }}>
        <p>
          Terms and Conditions Welcome to Community Connect, a platform designed
          to connect orphanages, organizations, and users. Before using our
          website, please read and understand the following terms governing your
          use: <br />
          <b>1. Acceptance of Terms: </b> By using Community Connect, you agree
          to these terms and any additional terms referenced here or provided by
          hyperlink. User Eligibility: Community Connect is open to orphanages,
          organizations, and users 18 or older who can enter binding contracts.
          By using the platform, you represent that you meet these requirements.
          <br />
          <br />
          <b>2. Account Registration: </b> An account may be required to access
          certain features. You agree to provide accurate and current
          information during registration and to update it as needed.
          <br />
          <br />
          <b> User Responsibilities:</b> Orphanages: May request financial
          assistance and accept donations. They are responsible for accurate
          information and ensuring donations are used appropriately.
          <br />
          <b> 3. Organizations: </b> May organize blood camps through Community
          Connect. They are responsible for coordinating and managing events
          according to local regulations and best practices. Users: May donate
          to orphanages, participate in blood camps, and engage with other
          features. Users are responsible for ensuring the accuracy and
          legitimacy of their donations.
          <br />
          <b>4. Donations:</b>
          Community Connect facilitates donations between users and orphanages.
          We do not guarantee the accuracy or legitimacy of any information
          provided. Users are solely responsible for evaluating the legitimacy
          and effectiveness of orphanages and donation requests before donating.
          <br />
          <b>5. Conduct: </b>
          Users are prohibited from unlawful, offensive, abusive, or harmful
          conduct. Users must respect the privacy and rights of others and avoid
          violating those rights.
          <br />
          <br />
          <b>6. Intellectual Property: </b>
          All content and materials on Community Connect, including text,
          graphics, logos, images, and software, are the property of Community
          Connect or its licensors and are protected by copyright and other
          intellectual property laws. Limitation of Liability: Community Connect
          is provided "as-is" and "as-available" without any warranties. We
          shall not be liable for any damages arising out of or related to your
          use of Community Connect.
          <br />
          <br />
          <b>7. Indemnification: </b>
          You agree to indemnify, defend, and hold harmless Community Connect,
          its officers, directors, employees, agents, licensors, and suppliers
          from any losses, expenses, damages, and costs, including reasonable
          attorneys' fees, resulting from any violation of these terms or any
          activity related to your account by you or anyone else accessing
          Community Connect using your account. Modification of Terms: Community
          Connect reserves the right to modify these terms at any time without
          prior notice. Your continued use of Community Connect following any
          such modification constitutes your acceptance of the modified terms.
          <br />
          <br />
          <b>Governing Law: </b> These terms shall be governed by and construed
          in accordance with the laws of India.
          <br />
          Contact Us: If you have any questions or concerns, please contact us
          at communityconnect@gmail.com.
        </p>
      </div>
      <UserFooter />
    </div>
  );
};

export default TermsConditions;
