import React from 'react';

type AppLayoutProps = {
  children: React.ReactNode;  
}

export default function appLayout({ children }: AppLayoutProps){
  return(
    <>
      {children}
    </>
  )
}