import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"


import prisma from '../lib/prisma';

// index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="aflex items-center justify-between max-w-2xl mt-5 mx-auto transition duration-700  cursor-pointer">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>

      <head>
        <title>thxnura.writes - test build</title>
      </head>
      
    </Layout>
  )
}

export default Blog
