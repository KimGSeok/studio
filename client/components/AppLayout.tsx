import { ReactNode, Dispatch, SetStateAction }  from 'react';
import Header from './Header';
import Footer from './Footer';

type AppLayoutProps = {
  firstPathName: string;
  children: ReactNode;
}

const AppLayout = ({ firstPathName, children }: AppLayoutProps) => {

  if(firstPathName === 'login'){
    return(
      <>
        {children}
      </>
    )
  }else{
    return(
      <>
        <Header />
        {children}
        <Footer />
      </>
    )
  }
}

export default AppLayout;