import styled from "styled-components";

export const Title = styled.h1`
    font-size: ${(props) => (props.fontSize ? props.fontSize : "2.5rem")};
    color: ${(props) => (props.color ? props.color : "inherit")};
    text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
    margin-bottom: ${(props) =>
        props.marginBottom ? props.marginBottom : "0"};
    text-decoration: ${(props) => props.textDecoration && props.textDecoration};
    text-underline-offset: 12px;
`;
