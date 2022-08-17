import styled from "styled-components";

export const Title = styled.h1`
    font-size: 2.5rem;
    text-align: ${props => props.textAlign ? props.textAlign : 'center'};
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '30px'};
    text-decoration: ${props => props.textDecoration  && props.textDecoration};
    text-underline-offset: 12px;
`;