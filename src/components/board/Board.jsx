import styled from "styled-components";

export const Board = styled.ul`
    width: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    list-style: none;

    h3 {
        overflow-wrap: break-word;
        width: 80%;
    }

    li {
        display: flex;
        flex-direction: column;
        aspect-ratio: 1;
        color: inherit;
        padding: 20px;
        border-radius: var(--border-radius);
        background-color: var(--light-grey);
        gap: 5px;

        p {
            word-break: break-all;
            span {
                font-weight: bold;
            }
        }
    }

    @media (max-width: 992px) {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    }

    @media (max-width: 680px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;
