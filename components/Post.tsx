import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div className="bg-white min-w-full min-h-full rounded-2xl shadow-md" onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2 className="font-bold">{post.title}</h2>
      <small className="text-blue-600 font-mono">By {authorName}</small>
      {/*<ReactMarkdown children={post.content} />*/}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>

    
  );
};

export default Post;
