import React from 'react';
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Head from 'next/head';

import { signIn } from "next-auth/react"
import { Header } from 'components/layouts';

const Profile = () => {
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const [content, setContent] = useState()

    // Fetch content from protected route
    // useEffect(() => {
    //         const fetchData = async () => {
    //             const res = await fetch("/profile")
    //             const json = await res.json()
    //             if (json.content) {
    //                 setContent(json.content)
    //             }
    //         }
    //         fetchData()
    //     }, [session])

    const profileData = {
        title: 'The Profile',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    };

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== "undefined" && loading) return null;

    // If no session exists, display access denied message
    if (!session) {
        return (
            <p>
                <a
                href="/api/auth/signin"
                onClick={(e) => {
                    e.preventDefault()
                    signIn()
                }}
                >
                You must be signed in to view this page
                </a>
            </p>
        )
    }
    
    // If session exists, display content
    return (
      <>
        <Head>
            <title>Profile | OPub</title>
        </Head>
        <Header data={profileData} />
      </>
    );
}

export default Profile;