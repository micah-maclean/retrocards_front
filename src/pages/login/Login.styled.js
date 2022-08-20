import styled from "styled-components";
import { Container } from "../../components/container/Container";

export const HalfCircle = styled(Container)`
    bottom: ${(props) => props.bottom};
    left: ${(props) => props.left};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: ${(props) => props.borderRadius};
    transform: rotate(270deg);

    @media (max-width: 1200px) {
        display: none;
    }
`;
