import React from 'react';
import { PartnerCard, TeamCard } from 'components/pages/about';
import { Header } from 'components/layouts';
import styled from 'styled-components';
import { Seo } from 'components/common';

const About = ({ members: members, partners: partners }) => {
  const headerData = {
    title: 'The Team',
    content:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  };

  // const partners = [
  //   {
  //     name: 'CivicDataLab',
  //     title: 'Technology Partner',
  //     img: '/assets/images/cdl.png',
  //     desc: [
  //       'We are a research lab working at the intersection of data, tech, design and social science to strengthen the course of civic engagements in India.',
  //       'We work to harness the potential of open knowledge movements and better enable citizens to engage in matters of public reform.',
  //       'We aim to grow data and tech literacy of governments, non-profits, think-tanks, media houses, universities, and more to enable data-driven decision making at scale.',
  //     ],
  //     email: 'info@civicdatalab.in',
  //     github: '#',
  //     linkedin: '#',
  //     twitter: '#',
  //     class: 'partners--dark-img',
  //   },
  //   {
  //     name: 'National Informatics Centre',
  //     title: 'Platform Owner',
  //     img: '/assets/images/NIC-logo.jpg',
  //     desc: [
  //       'National Informatics Centre (NIC) under the Ministry of Electronics and Information Technology (MeitY) is the technology partner of the Government of India. NIC was established in the year 1976 with the objective to provide technology-driven solutions to Central and State Governments.',
  //     ],
  //     email: 'info@civicdatalab.in',
  //     github: '#',
  //     linkedin: '#',
  //     twitter: '#',
  //     class: 'partners--dark-img',
  //   },
  // ];

  // Use getStaticProps here instead of calling function OR useState

  // const team = [
  //   {
  //     name: 'Gaurav Godhwani',
  //     title: 'Lead',
  //     image: '/images/contributors/gaurav.jpg',
  //     github: 'https://github.com/gggodhwani',
  //     linkedin: 'https://www.linkedin.com/in/gggodhwani',
  //     twitter: 'https://twitter.com/gggodhwani',
  //   },
  //   {
  //     name: 'Kabeer',
  //     title: 'Project Lead',
  //     image: '/images/contributors/kabeer.jpg',
  //     github: 'https://github.com/Kabeer3',
  //     linkedin: 'https://www.linkedin.com/in/kabeer-arora-69827661/',
  //     twitter: 'https://twitter.com/kabeer3391',
  //   },
  //   {
  //     name: 'Shreya Agrawal',
  //     title: 'Data Engineer',
  //     image: '/images/contributors/shreya.jpg',
  //     github: 'https://github.com/shreyaagrawal0809',
  //     linkedin: 'https://github.com/shreyaagrawal0809',
  //     twitter: 'https://twitter.com/shreya_0809',
  //   },
  //   {
  //     name: 'Abhinav',
  //     title: 'Backend Engineer',
  //     image: '/images/contributors/abhinav.jpg',
  //     github: 'https://github.com/Abhi2102',
  //   },
  //   {
  //     name: 'Shoaib Ahmed',
  //     title: 'Frontend Engineer',
  //     // image: '/images/contributors/shoaib.jpg',
  //     github: 'https://github.com/pixeledcode',
  //     linkedin: 'https://www.linkedin.com/in/pixeledcode',
  //     twitter: 'https://twitter.com/PixeledCode',
  //   },
  // ];

  const seo = {
    title: 'About Us | OPub',
  };

  return (
    <div>
      <Seo seo={seo} />
      <Header data={headerData} />
      <AboutPage>
        <h3 className="partners__heading">Partners</h3>
        <ul className="partners">
          {partners.map((item, key) => {
            return (
              <li key={`partners-${key}`}>
                <PartnerCard card={item} />
              </li>
            );
          })}
        </ul>
        <section className="about__team">
          <h3>
            <span /> members
          </h3>
          <p>Meet the doers &amp; builders</p>

          <ul>
            {members.map((item, key) => {
              return (
                <li key={`team-${key}`}>
                  <TeamCard card={item} />
                </li>
              );
            })}
          </ul>
        </section>
      </AboutPage>
    </div>
  );
};

export async function getStaticProps() {
  const memberReq = await fetch(`${process.env.STRAPI_URL}/members`);
  const memberRes = await memberReq.json();

  let members = [];

  memberRes.map((item) => {
    members.push({
      name: item.name,
      title: item.title,
      image: `${process.env.STRAPI_URL}` + item.image.url,
      github: item.github,
      linkedin: item.linkedin,
      twitter: item.twitter,
    });
  });

  const partnerReq = await fetch(`${process.env.STRAPI_URL}/partners`);
  const partnerRes = await partnerReq.json();

  let partners = [];
  partnerRes.map((item) => {
    partners.push({
      name: item.name,
      title: item.title,
      desc: item.desc,
      github: item.github,
      linkedin: item.linkedin,
      twitter: item.twitter,
      img: item.img ? `${process.env.STRAPI_URL}` + item.img.url : '',
    });
  });

  return {
    props: {
      members: members,
      partners: partners,
    },
  };
}

export default About;

const AboutPage = styled.main`
  width: 1100px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  .partners__heading {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 130%;
    color: #000;
  }

  .partners {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    justify-content: space-between;
    align-items: stretch;

    li {
      width: 48%;

      > div {
        display: grid;
        height: 100%;
        grid-template-rows: max-content 1fr max-content;
      }
    }
  }
  .about__team {
    margin-top: 4rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 130%;
      color: rgba(0, 0, 0, 0.32);

      span {
        background: #4965b2;
        border-radius: 2px;
        width: 3rem;
        display: inline-block;
        height: 3px;
        margin-right: 0.5rem;
      }
    }

    p {
      font-size: 2.5rem;
      line-height: 130%;
      margin-top: 10px;
    }

    ul {
      margin-top: 3rem;
      background-color: #fff;
      border-radius: 12px;
      border: 1px solid #f1eef1;
      padding: 0 6rem 5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    li {
      width: 33.3%;
      display: flex;
      justify-content: center;
    }
  }
`;
