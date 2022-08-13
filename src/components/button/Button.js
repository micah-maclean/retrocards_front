import styled from "styled-components";

export const Button = styled.button`
  font-size: 14px;

  cursor: pointer;

  border: ${(props) => props.border ? props.border : 'none'};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "8px"};

  padding: 8px;

  background-color: ${(props) =>
    props.backgroundColor && props.backgroundColor};
  color: ${(props) => (props.color ? props.color : "white")};

  width: ${(props) => (props.width ? props.width : "fit-content")};
  height: ${(props) => (props.height ? props.height : "fit-content")};

  &:hover {
    opacity: 0.6;
  }
`;
