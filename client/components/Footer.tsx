import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface Footer {
  pathname: string
}

const Footer = () =>{

  const router = useRouter();
  const { pathname }:Footer = router;

  return(
    <>
    {
      pathname === '/' ? '' :
      <FooterEl>
        <FooterTitle>Maison de siri</FooterTitle>
        <FooterContent>Address : 서울특별시 서대문구 연희동 200-20 | 서울특별시 마포구 서교동 453-13</FooterContent>
        <FooterContent>CEO : Hyung Sung Min</FooterContent>
        <FooterContent>Tel : 010-4825-2894</FooterContent>
        <FooterContent>Instagram : @maison_de_siri</FooterContent>
        <FooterContent>Business License : 524-87-01369</FooterContent>
      </FooterEl>
    }
    </>
  )
}

const FooterEl = styled.footer({
  height: '220px',
  backgroundColor: '#f4f8f8',
  padding: '30px 12%',
  lineHeight: '1.7rem',

  /* Tablet */
  '@media screen and (max-width: 1024px)': {
    fontSize: '0.95rem',
    height: '200px',
    backgroundColor: '#f4f8f8',
    padding: '25px 8%',
    lineHeight: '1.55rem',
    wordBreak: 'keep-all'
  },

  /* Phone */
  '@media screen and (max-width: 480px)': {
    fontSize: '0.9rem',
    textAlign: 'right',
    height: '190px',
    backgroundColor: '#f4f8f8',
    padding: '18px 6%',
    lineHeight: '1.4rem',
    wordBreak: 'keep-all'
  }
})
const FooterTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`
const FooterContent = styled.div`
  font-weight: 500;
`

export default Footer;