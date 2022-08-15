import styled from "styled-components";
import { Container } from "../../components/container/Container";

export const Bar = styled.div`
    width: ${(props) => props.width && props.width};
    height: ${(props) => props.height && props.height};

    background-color: ${(props) =>
        props.backgroundColor && props.backgroundColor};
    margin-top: 10px;
`;

export const Title = styled.h1`
    font-size: 2.5rem;
`;

export const Paragraph = styled.p`
    font-size: 1.25rem;
    text-align: ${(props) => props.textAlign && props.textAlign};
    align-self: ${(props) => props.alignSelf && props.alignSelf};

    a {
        text-underline-offset: 5px;
        color: #000;
    }
`;

export const HalfCircle = styled(Container)`
    bottom: ${(props) => props.bottom};
    left: ${(props) => props.left};
    shape-outside: circle(50% at 30%);
    clip-path: circle(50% at 0%);
    transform: rotate(180deg);
`;
