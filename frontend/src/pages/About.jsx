import { Cloud1, Cloud2, Cloud3, Flash, Search, Star } from "../assets";
import { CloseButton, Translations } from "../components";
import { TeamCard } from "./components";

/* eslint-disable react/no-unescaped-entities */
const About = () => {
  return (
    <div>
      <div className="bg-content relative text-white py-20">
        <div className="absolute inset-0 z-0">
          <img
            src={Cloud1}
            alt=""
            className="absolute md:top-[450px] top-[300px] left-0 w-64 animate-upAndDown"
          />
          <img
            src={Cloud2}
            alt=""
            className="absolute md:top-[1000px] top-[2000px] left-0 w-64 animate-upAndDown"
          />
          <img
            src={Cloud3}
            alt=""
            className="absolute md:top-[450px] top-[300px] right-0 w-64 animate-upAndDown"
          />
          <img
            src={Cloud3}
            alt=""
            className="absolute md:block hidden md:top-[1000px] top-[2000px] right-0 w-64 animate-upAndDown"
          />
        </div>{" "}
        <div className="font-itim relative z-10 font-[100] my-10 md:w-4/5 md:px-0 px-5 mx-auto">
          <CloseButton route={`/`} />

          <h3 className="text-2xl">
            {" "}
            <Translations text="about_header" />
          </h3>
          <p className="font-inter font-[300]">
            <Translations text="about_foundation" />
          </p>
          <h3 className="mt-8 text-2xl">
            {" "}
            <Translations text="roadmap_header" />
          </h3>
          <p className="font-inter font-[300]">
            <Translations text="roadmap" />
          </p>
          <div className="my-20 md:gap-6 gap-10 flex flex-col">
            <div>
              <div className="bg-card pl-16 font-[400] md:w-fit border-[4px] border-white rounded-[200px] flex items-center p-6 px-8 gap-10">
                <img src={Star} alt="" className="w-20" />
                <div className="font-inter">
                  <p className="text-[#FFD25D]">
                    <Translations text="roadmap_phaseone" />
                  </p>
                  <h4 className="font-itim text-2xl my-2">
                    {" "}
                    <Translations text="roadmap_phaseone_theme" />
                  </h4>
                  <p className="md:w-[220px] text-sm">
                    <Translations text="roadmap_phaseone_text" />
                  </p>
                </div>
              </div>
            </div>
            <div className="md:flex md:justify-end">
              <div className="bg-card pl-16 font-[400] md:w-fit border-[4px] border-white rounded-[200px] flex items-center p-6 px-8 gap-10">
                <img src={Search} alt="" className="w-16" />
                <div className="font-inter">
                  <p className="text-[#FFD25D]">
                    {" "}
                    <Translations text="roadmap_phasetwo" />
                  </p>
                  <h4 className="font-itim text-2xl my-2">
                    {" "}
                    <Translations text="roadmap_phasetwo_theme" />
                  </h4>
                  <p className="md:w-[220px] text-sm">
                    <Translations text="roadmap_phasetwo_text" />
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-card pl-16 font-[400] md:w-fit border-[4px] border-white rounded-[200px] flex items-center p-6 px-8 gap-10">
                <img src={Flash} alt="" className="w-12" />
                <div className="font-inter">
                  <p className="text-[#FFD25D]">
                    {" "}
                    <Translations text="roadmap_phasethree" />
                  </p>
                  <h4 className="font-itim text-2xl my-2">
                    {" "}
                    <Translations text="roadmap_phasethree_theme" />
                  </h4>
                  <p className="md:w-[220px] text-sm">
                    <Translations text="roadmap_phasethree_text" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <h3 className="mt-8 text-2xl">The Special Council</h3>
        <p className="font-inter font-[300]">
          Special Council members provide guidance on Sandbox Improvement
          Proposals (SIPs), ensuring that they align with The SMC DAO's vision
          and the community's interests. They also hold decision-making power
          and can veto proposals based on legality, redundancy, conflict, and
          community interests.
        </p>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-20 mt-8">
          <TeamCard name="Frederic Montagnon" title="Chairman of Arianee" />
          <TeamCard name="Frederic Montagnon" title="Chairman of Arianee" />
          <TeamCard name="Frederic Montagnon" title="Chairman of Arianee" />
          <TeamCard name="Frederic Montagnon" title="Chairman of Arianee" />
        </div>
        <h3 className="mt-10 text-2xl">Advisory Board</h3>
        <p>
          Leaders in their respective fields, these cultural ambassadors and
          strategic advisors leverage their expertise and networks to guide the
          DAO toward its vision of a decentralized, vibrant metaverse. This
          multi-disciplinary team reflects The SMC's diverse and global reach
          while fostering a community that values creativity, innovation, and
          inclusivity.
        </p>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-20 mt-10">
          <TeamCard name="Frederic Montagnon" title="Chairman of Arianee" />
          <TeamCard name="Frederic Montagnon" title="Chairman of Arianee" />
          <TeamCard name="Frederic Montagnon" title="Chairman of Arianee" />
          <TeamCard name="Frederic Montagnon" title="Chairman of Arianee" />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default About;
