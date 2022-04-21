// Header.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  <div>
    
  </div>

  
  let left = (
    <div>
      <Link href="/">
        <a className="" data-active={isActive('/')}>
          <img className='w-10' src="https://thxnura.com/packages/images/favi.png" alt="" />
        </a>        
      </Link>
    </div>
  );

  let right = null;

  let signin = null;

  let otherc = null;


  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            Feed
          </a>
        </Link>
        
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        
      </div>
    );
  }

  if (!session) {
    signin = (
      <div className="space-x-3">

        <a href="">Get Started</a>

        <Link href="/api/auth/signin">

          <button className='px-3 py-1 rounded-3xl text-white bg-green-500' data-active={isActive('/signup')}>Sign In</button>
        </Link>
       
      </div>
    );
    
  }

  if (!session) {
    left = (
      
      <Link href="/">
        <div className="flex items-center space-x-3" data-active={isActive('/')}>
          <a href="">
            <img className='w-10' src="https://thxnura.com/packages/images/favi.png" alt="" />
          </a>

          <h1 className='hidden md:block'>thxnura.writes</h1>
          
        </div>        
      </Link>

    )
otherc = (

  <div className='space-x-3 '>
      
  </div>
 
);

      

  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
        <div className="flex items-center space-x-3" data-active={isActive('/')}>
          <a href="">
            <img className='w-10' src="https://thxnura.com/packages/images/favi.png" alt="" />
          </a>

          <h1 className='hidden md:block'>thxnura.writes</h1>
          
        </div>        
      </Link>


        
        
      </div>
    );
    
    right = (
      <div className="space-x-3 font-bold">
        

        <Link href="/create">
            <button>
              <a>New post</a>
            </button>
          </Link>

          <Link href="/drafts">
          <a data-active={isActive('/drafts')}>My drafts</a>
        </Link>

                    
      </div>
      )
      
      otherc = (

        <div className='space-x-3'>

<div className="text-right  flex items-center">
  <div className='flex mr-auto md:mr-40 ml-auto items-center space-x-4'>
    <p className='flex space-x-1'> 
    <p>Hey,</p>
            <span className='font-bold'>
            {session.user.name} 
            {/*  ({session.user.email}) */}
            </span>
          </p>   

          <button className='px-3 py-1 text-white text-sm bg-gray-600 rounded-3xl' onClick={() => signOut()}>
            <a>Log out</a>
          </button>   
  </div>
             
      </div>
          
        


        
        </div>
       
      );
         
  }


  
  return (
    <nav className=''>

       <div className='block mr-auto ml-auto p-1 mx-auto transition duration-700 bg-slate-900 shadow-md'>
        
        <div className='text-center text-white'>
         {otherc}
        </div>
      
      </div>
     
      

      <div className='flex items-center justify-between p-5 max-w-7xl mx-auto transition duration-700 bg-slate-100 shadow-md rounded-3xl'>
        {left}
        {signin}
        {right} 
     

      </div>
           
     


    </nav>
  );
};

export default Header;