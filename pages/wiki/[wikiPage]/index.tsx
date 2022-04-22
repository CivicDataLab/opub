import React from "react";
import Head from "next/head";
import styled from 'styled-components';

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const WikiPageId = (props) => {

    return (
        <>
        <Head>
            <title>Wiki | NDP</title>
        </Head>
        <WikiDoc>
            <h1 className="center"> {props.wiki.title} </h1>
            <br /><br />

            <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            transformImageUri={uri =>
                uri.startsWith("http") ? uri : `${process.env.STRAPI_URL}${uri}`
              }
            >{props.wiki.content}</ReactMarkdown>
        </WikiDoc>
        
        </>
    )
}

export async function getStaticProps(context) {

    const contentReq = await fetch(`${process.env.STRAPI_URL}/wikis/${context.params.wikiPage}`);
    const wiki = await contentReq.json();

    return{
        props: { wiki }
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
        margin-left: 30px;
        list-style-type: disc;
    }

    li li {
        display: list-item;
        margin-left: 30px;
        list-style-type: circle;
    }

    img {
        width: 80%;
    }

    table {
        margin-top: 2vh;
        margin-bottom: 2vh;
        border-collapse: collapse;
        width: 100%;
    }

    table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #2d523f;
        color: white;
    }

    table th, table td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    table tr:nth-child(even){
        background-color: #f2f2f2;
    }

    blockquote {
        color: #666;
        margin: 0;
        padding-left: 3em;
        border-left: 0.5em #eee solid;
    }

`;