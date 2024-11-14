import { CloseButton } from '../components';
import { TeamCard } from './components';

/* eslint-disable react/no-unescaped-entities */
const About = () => {
  return (
    <div className='bg-content text-white py-20'>
      <div className='font-itim font-[100] my-10 md:w-4/5 md:px-0 px-5 mx-auto'>
        <CloseButton />

        <h3 className='text-2xl'>About The foundation</h3>
        <p>
          The SMC DAO Foundation is the steward tasked with administering the
          decisions of the DAO and managing the accompanying operations,
          including management of the treasury and employment of the DAO support
          team.
        </p>
        <h3 className='mt-8 text-2xl'>Roadmap</h3>
        <p>
          The SMC DAO will launch in phases, enabling us to collaborate with our
          community, gather input, and incorporate feedback throughout the
          process. Each milestone has been carefully constructed to support our
          ongoing development and expansion efforts.
        </p>
        <h3 className='mt-8 text-2xl'>The Special Council</h3>
        <p>
          Special Council members provide guidance on Sandbox Improvement
          Proposals (SIPs), ensuring that they align with The SMC DAO's vision
          and the community's interests. They also hold decision-making power
          and can veto proposals based on legality, redundancy, conflict, and
          community interests.
        </p>

        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-8'>
          <TeamCard name='Frederic Montagnon' title='Chairman of Arianee' />
          <TeamCard name='Frederic Montagnon' title='Chairman of Arianee' />
          <TeamCard name='Frederic Montagnon' title='Chairman of Arianee' />
          <TeamCard name='Frederic Montagnon' title='Chairman of Arianee' />
        </div>
        <h3 className='mt-10 text-2xl'>Advisory Board</h3>
        <p>
          Leaders in their respective fields, these cultural ambassadors and
          strategic advisors leverage their expertise and networks to guide the
          DAO toward its vision of a decentralized, vibrant metaverse. This
          multi-disciplinary team reflects The SMC's diverse and global reach
          while fostering a community that values creativity, innovation, and
          inclusivity.
        </p>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-10'>
          <TeamCard name='Frederic Montagnon' title='Chairman of Arianee' />
          <TeamCard name='Frederic Montagnon' title='Chairman of Arianee' />
          <TeamCard name='Frederic Montagnon' title='Chairman of Arianee' />
          <TeamCard name='Frederic Montagnon' title='Chairman of Arianee' />
        </div>
      </div>
    </div>
  );
};

export default About;
