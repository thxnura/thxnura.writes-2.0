// pages/p/[id].tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}


async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}


const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  let title2;
  if (!props.published) {
    title2 = `(Draft)`;
  }

  return (
    <Layout>
      <div className='flex items-center justify-between max-w-xl mt-5 mx-auto transition duration-700 shadow-md rounded-3xl cursor-pointer py-4 bg-white'>
      <div className='tblock ml-auto mr-auto text-center'>
        <h2 className='text-2xl'>{title} <span className='text-red-600'>{title2}</span></h2>
        <p className='text-sm'>By {props?.author?.name || 'Unknown author'}</p> <hr className='mt-2' />
        <div className=''>
          <div className=''>
          <ReactMarkdown children={props.content} />
          <hr className='mb-2' />
          </div>
        </div>
        
        <div className='space-x-2'>
        {
        !props.published && userHasValidSession && postBelongsToUser && (
          <button className='bg-green-400 px-2 rounded-xl text-white ' onClick={() => publishPost(props.id)}>Publish</button>
        )
        }

      {
        userHasValidSession && postBelongsToUser && (
          <button className='bg-red-400 px-2 rounded-xl text-white ' onClick={() => deletePost(props.id)}>Delete</button>
        )
      }
        </div>
        

        
      </div> 
      </div>
      

      <head>
        <title>{title} | thxnura.writes</title>
      </head>
    
    </Layout>
  );
};

export default Post;