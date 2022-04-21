import React from "react";
import Head from 'next/head';
import WikiMainPage from "./WikiMainPage";
import Link from "next/link";
import { Header } from 'components/layouts';

const Wiki = (wikis) => {
    const headerData = {
        title: 'Wiki',
        description:
          'The collection of public documents regarding the consultations, design and development of the ecosystem',
    };
      
    return (
        <div>
            <Head>
                <title>Wiki | NDP</title>
            </Head>
            <Header data={headerData} />            
            <ul>
            {wikis.wikis.map((item) => {
              return (
                <li key={`${item.slug}`}>
                    <WikiMainPage>
                        <div className="WikiCard">
                            <svg 
                            width="70pt" 
                            height="70pt" 
                            version="1.1" 
                            viewBox="0 0 700 700" 
                            xmlns="http://www.w3.org/2000/svg">
                                <path d="m176.4 103.6c-9.4531 0.0664-16.742 9.4688-16.801 16.801v459.2c0 8.7969 8.0039 16.801 16.801 16.801h347.2c8.7969 0 16.801-8.0039 16.801-16.801v-358.4c0-4.4023-1.793-8.7812-4.8984-11.898l-100.8-100.8c-3.1172-3.1055-7.4961-4.9102-11.898-4.8984zm16.801 33.602h212.8v84c0 8.7969 8.0039 16.801 16.801 16.801h84v324.8h-313.6zm246.4 23.625 43.574 43.574h-43.574zm-201.6 133.18c-9.2773 0-16.801 7.5195-16.801 16.801 0 9.2773 7.5234 16.801 16.801 16.801h179.2c9.2773 0 16.801-7.5234 16.801-16.801 0-9.2773-7.5234-16.801-16.801-16.801zm0 89.602c-9.2773 0-16.801 7.5195-16.801 16.801 0 9.2773 7.5234 16.801 16.801 16.801h224c9.2773 0 16.801-7.5234 16.801-16.801s-7.5195-16.801-16.801-16.801zm0 89.602c-9.2773 0-16.801 7.5195-16.801 16.801 0 9.2773 7.5234 16.801 16.801 16.801h224c9.2773 0 16.801-7.5234 16.801-16.801 0-9.2773-7.5195-16.801-16.801-16.801z"/>
                            </svg>
                            <h4>{item.title}</h4>
                            <p>
                                <Link href={"/wiki/"+ item.id}>
                                    Read More
                                </Link>
                            </p>
                        </div>
                    </WikiMainPage>
                  
                </li>
              );
            })}
          </ul>
        </div>
    );
}

export async function getStaticProps() {
    const wikiReq = await fetch(`${process.env.STRAPI_URL}/wikis`);
    const wikis = await wikiReq.json();
  
    return {
        props: {
            wikis
        }
    }
}

export default Wiki;