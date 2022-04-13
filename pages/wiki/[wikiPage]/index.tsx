import React from "react";
import Head from "next/head";
import styled from 'styled-components';

import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

const WikiPageId = (props) => {

    return (
        <>
        <Head>
            <title>Wiki | NDP</title>
        </Head>
        <WikiDoc>
            <h1 className="center"> {props.wiki.title} </h1>
            <br /><br />

            <div 
            dangerouslySetInnerHTML={{ __html: props.content }}>
            </div>
        </WikiDoc>
        
        </>
    )
}

export async function getStaticProps(context) {

    const contentReq = await fetch(`${process.env.STRAPI_URL}/wikis/${context.params.wikiPage}`);
    const wiki = await contentReq.json();

    const renderHTML = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(wiki.content);

    const content = await renderHTML.toString();

    // console.log(content);
    
    return{
        props: { wiki, content }
    }
}

export async function getStaticPaths() {
    const contentReq = await fetch(`${process.env.STRAPI_URL}/wikis`);
    const wikiList = await contentReq.json();

    const paths = wikiList.map((element) => {
        return {
            params: {
                wikiPage: element.id.toString()
            }
        }
    });

    return {
        paths,
        fallback: false
    }
}

export default WikiPageId;


const WikiDoc = styled.main`
    width: 1100px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    background-color: #fff;
    padding: 1.5rem !important;
    border-radius: 12px;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));
    border: 1px solid #f1eef1;
    margin-top: 10px;
    margin-bottom: 30px;

    .center {
        text-align: center;
    }

    li {
        display: list-item;
        margin-left: 10px;
        list-style-type: circle;
    }

`;