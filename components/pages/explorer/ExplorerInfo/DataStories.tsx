import Button from "components/actions/Button";
import React from "react";
import styled from "styled-components";
import Image from 'next/image';

const storiesData = {
    name: 'Data Stories',
    id: 'DataStories',
    ico: '/assets/images/placeholder.jpg',
    content: {
      stories: [
        {
          title: "Name of the featured Data Story",
          image: "/assets/images/placeholder.jpg",
          author: "Arpit Arora",
          publishDate: "02 June 2022",
          tags: ['data', 'social', 'technology', 'research'],
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur in corrupti nam harum facilis officiis dolores odit saepe excepturi quibusdam, itaque iure, aliquam minima obcaecati maiores veniam? Dolorem, facere temporibus."
        },
        {
          title: "Name of the featured Data Story",
          image: "/assets/images/placeholder.jpg",
          author: "Arpit Arora",
          publishDate: "02 June 2022",
          tags: ['data', 'social', 'technology', 'research'],
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur in corrupti nam harum facilis officiis dolores odit saepe excepturi quibusdam, itaque iure, aliquam minima obcaecati maiores veniam? Dolorem, facere temporibus."
        },
        {
          title: "Name of the featured Data Story",
          image: "/assets/images/placeholder.jpg",
          author: "Arpit Arora",
          publishDate: "02 June 2022",
          tags: ['data', 'social', 'technology', 'research'],
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur in corrupti nam harum facilis officiis dolores odit saepe excepturi quibusdam, itaque iure, aliquam minima obcaecati maiores veniam? Dolorem, facere temporibus."
        },
        {
          title: "Name of the featured Data Story",
          image: "/assets/images/placeholder.jpg",
          author: "Arpit Arora",
          publishDate: "02 June 2022",
          tags: ['data', 'social', 'technology', 'research'],
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur in corrupti nam harum facilis officiis dolores odit saepe excepturi quibusdam, itaque iure, aliquam minima obcaecati maiores veniam? Dolorem, facere temporibus."
        },
      ],
    }
  }

const DataStories = () => {
    return (
        <div>
            <h2>Other data-stories for this dataset</h2>
            <DataStoryWrapper>

                {storiesData.content['stories'].map((story, index) => (
                <DataStoryCard key={`DataStoryCard-${index}`}>
                    <Image alt="" src={story.image} width={500} height={300} />
                    <p>{`By ${story.author} | ${story.publishDate}`}</p>
                    <h3>{story.title}</h3>
                    <p>{story.description}</p>
                </DataStoryCard>
                ))}
            </DataStoryWrapper>

            <NewStoryCard>
                <h3>Something worthy enough to make a noise using data ?</h3>
                <p>Write something impactful</p>
                <Button
                kind='primary-outline'
                >
                Create a Data Story
                </Button>
            </NewStoryCard>

        </div>
    )
}

export default DataStories;

const DataStoryWrapper = styled.div`
  
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr));
  // padding-top: 2%;
`;

const DataStoryCard = styled.div`
  border: 2px solid #c3cfd9;
  padding: 10px;
  background: white;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const NewStoryCard = styled.div`
  border: 2px solid #9eadba;
  padding: 40px;
  background: #dfe6ed;

  p, Button{
    margin-top: 1vh;
  }
`;