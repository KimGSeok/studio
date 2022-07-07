import styled from '@emotion/styled';

const Footer = () =>{
  return(
    <FooterEl>
      <FooterTitle>Maison de siri</FooterTitle>
      <FooterContent>Address : 서울특별시 서대문구 연희동 200-20 | 서울특별시 마포구 서교동 453-13</FooterContent>
      <FooterContent>CEO : Hyung Sung Min</FooterContent>
      <FooterContent>Tel : 010-4825-2894</FooterContent>
      <FooterContent>Instagram : @maison_de_siri</FooterContent>
      <FooterContent>Business License : 524-87-01369</FooterContent>
    </FooterEl>
  )
}

const FooterEl = styled.footer`
  background-color: #f4f8f8;
  padding: 1.5% 12%;
  line-height: 1.7rem;
`
const FooterTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`
const FooterContent = styled.div`
  font-weight: 500;
`

export default Footer;