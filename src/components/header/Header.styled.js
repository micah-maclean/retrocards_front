import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    background-color: #12101a;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    width: 100%;
    height: 100px;

    span {
        height: 25px;
    }

    svg {
        font-size: 24px;
    }

    div {
        button {
            svg {
                font-size: 16px;
                margin-right: 8px;
            }
        }
    }
`;
