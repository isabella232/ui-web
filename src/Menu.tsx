import * as React from "react";
import styled from "styled-components";


const MenuBox = styled.ul<Props>`
  list-style:none;
  margin: 0px;
  padding:0px;
  display: flex;
`;

export const MenuItem = styled.li<Props>`
  padding-right: 5px;
  margin-right: 0px;
`;

export interface Props {
  children?: React.ReactNode;
}

const Menu  = (props: Props) => {
      return (
        <MenuBox {...props} >
          {props.children} 
        </MenuBox>
      );
} 

export default Menu