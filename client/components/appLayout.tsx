import React from 'react';
import Header from './header';

type AppLayoutProps = {
  children: React.ReactNode;  
}

export default function appLayout({ children }: AppLayoutProps){
  return(
    <>
      <Header />
      {children}
    </>
  )
}