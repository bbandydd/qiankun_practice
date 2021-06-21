import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.div`
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 50px;
  position: relative;
`;

export const Logo = styled.div`
  float: left;
  margin: 0 50px;
`;

export const SubApps = styled.ul`
  list-style: none;
  margin: 0;

  li{
    list-style: none;
    display: inline-block;
    padding: 0 20px;
    cursor: pointer;
    &.active{
      color: #42b983;
      text-decoration: underline;
    }
  }
`;
