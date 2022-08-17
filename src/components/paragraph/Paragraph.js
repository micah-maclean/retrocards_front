import styled from "styled-components";

export const Paragraph = styled.p`
    font-size: 1.25rem;
    text-align: ${(props) => props.textAlign && props.textAlign};
    align-self: ${(props) => props.alignSelf && props.alignSelf};

    a {
        text-underline-offset: 5px;
        color: inherit;
    }
`;