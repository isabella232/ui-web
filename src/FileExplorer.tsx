import React, { FC,  HTMLAttributes, useState} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFileAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { generate } from 'shortid';

const folderIcon =  <FontAwesomeIcon icon={faFolder} style={{ fontSize: "14px", opacity: "0.6", marginRight: "8px" }} />
const fileIcon =  <FontAwesomeIcon icon={faFileAlt} style={{ fontSize: "14px", opacity: "0.6", marginRight: "8px" }} />
const arrowIcon =  <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px", opacity: "0.6", marginRight: "6px", verticalAlign: "middle", marginTop: "-4px" }} />
const arrowDownIcon =  <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px", opacity: "0.6", marginRight: "6px", verticalAlign: "middle", marginTop: "-4px", transform: "rotate(90deg)" }} />

// STYLED ITEMS

const UL = styled.ul`
  list-style: none;  
  margin: 0px;
  padding: 0px;
  padding-left: 20px;
  font-family: Roboto;
  font-size: 14px;
  
  li {
    height: 25px;
    line-height: 25px;
    margin-top: 3px;
    cursor: pointer;
    opacity: 0.8;

    &:hover{
        opacity: 1;
        font-weight: 400;
    }
  }
`

// Props Interface

export interface Props extends HTMLAttributes<HTMLDivElement> {
  data: string[][],
  folderLoading?: ( filePath: string) => Promise<string[][]> 
  fileLoading?: () => void
}

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  data: string[][],
  folderLoading: ( filePath: string) => Promise<string[][]> ,
  fileLoading: () => void,
}

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  fileName: string,
  path: string,
  fileType: string
  folderLoading: ( filePath: string) => Promise<string[][]> 
  fileLoading: () => void
}



// COMPONENTS

const Item = (props: ItemProps) => {
  let item
  if ( props.fileType == "dir"){
    const [ data, setData ] = useState([[""]])
    const [ showSub, setSubfiles ] = useState(false)
    // Folder
    item = ( 
      <>
        <li 
          key={ generate() }
          onClick = { ( ) => {
            if( data[0][0] == "" ){
            props.folderLoading( props.path).then( (data) => {
                setData(data)
            })
          }
           setSubfiles(!showSub)
          } }> 
            { !showSub && arrowIcon} 
            { showSub && arrowDownIcon }

          {folderIcon} { props.fileName } 
      </li>
        { 
          showSub &&
          <List data={data} fileLoading={ props.fileLoading } folderLoading={ props.folderLoading }/>
        }
      </>
    )
  }
  // File 
  else{
    item = <li key={ generate() } onClick={ () => { props.fileLoading()}   }> {fileIcon} { props.fileName } </li>
  }
  return (
    <>
      {item}    
    </>
  );
}

const List = (props: ListProps) => {
  if ( props.data[0][0] != "" ){
  const items = props.data.map((item) => 
    <Item fileName={item[0]} path={item[1]} fileType={item[2]} fileLoading={props.fileLoading} folderLoading={props.folderLoading}  />
  );
  return (
      <>
        <UL>
          {items}
        </UL>
      </>
    )
  }

  return (
    <>
    </>
  )
}


export const FileExplorer: FC<Props> = (props: Props) => {
      return (
        <>
            <List data={props.data} fileLoading={ props.fileLoading } folderLoading={ props.folderLoading } />
        </>
      );
} 

// EXTRA
let dummyData = [
       [ "", "", ""]
]

function fol( filePath: string ) {
 console.log("You clicked a folder")
 return dummyData}

function fil( ) {
  console.log("you clicked a file")
}

// If we want to pass on the default values
List.defaultProps = {
  fileLoading: fil,
  folderLoading: fol
}
