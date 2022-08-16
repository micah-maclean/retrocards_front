import styled from "styled-components";

export const Button = styled.button`
    font-size: 14px;
    font-weight: bold;

    cursor: pointer;

    visibility: ${props => props.visibility && props.visibility};
    display: flex;
    align-items: center;
    justify-content: center;

    border: ${(props) => (props.border ? props.border : "none")};
    border-radius: ${(props) =>
        props.borderRadius ? props.borderRadius : "8px"};

    padding: ${(props) => props.padding ? props.padding : '16px 64px'};
    margin: ${(props) => props.margin && props.margin};

    background-color: ${(props) =>
        props.backgroundColor && props.backgroundColor};
    color: ${(props) => (props.color ? props.color : "white")};

    width: ${(props) => (props.width && props.width)};
    height: ${(props) => (props.height && props.height)};

    &:hover {
        background-color: ${(props) =>
            props.backgroundColorHover && props.backgroundColorHover};
        color: ${(props) => (props.colorHover && props.colorHover)};
        border: ${(props) => (props.borderHover && props.borderHover)};
    }
`;
