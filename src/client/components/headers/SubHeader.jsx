import React from 'react'
import Styled from "styled-components"
import * as Colors from "../../../style/colors"

const SubHeaderStyled = Styled.div`
`

const HeaderContentStyled = Styled.div`
  h2 {
    font-weight: bold;
    margin: 0;
    line-height: 1;
    font-size: 2.5em;
  
    &:after {
      content: "";
      display: block;
      width: 30px;
      border-top: 8px solid ${Colors.mainGray};
      box-sizing: border-box;
      margin: 15px 0 25px 0;
      border-radius: 5px;
    }
  }
  
  h3 {
    font-weight: 400;
    margin: 0;
    font-size: 1.2em;
    margin: .5em 0;
    padding-left: 25px;
    width: 500px;
    max-width: 100%;
  }
`

const SubHeader = props => (
  <SubHeaderStyled className={props.customClass || "container p-50-0"}>
    <HeaderContentStyled className={"col-md-12"}>
      <h2>{props.title}</h2>
      <h3 className={"text-muted"}>{props.text}</h3>
    </HeaderContentStyled>
  </SubHeaderStyled>
)

export default SubHeader
