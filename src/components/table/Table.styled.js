import styled from "styled-components";

export const CustomTable = styled.table`
    width: 100%;
    border-collapse: collapse; 
    color: #fff;

    th {
        text-align: left;
    }

    thead {
        background-color: #414048;
    }

    tbody {
        tr {
            background-color: var(--dark-grey);
        }

        tr:hover {
            cursor: pointer;
            background-color: #414048;
        }
    }

    td, th {
        padding: 16px 24px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 800px) {
        thead {
            display: none;
        }

        td, th, tr {
            display: block;
            width: 100%;
        }

        tr {
            margin-bottom: 10px;
        }

        td::before {
            content: attr(data-title);
            font-weight: bold;
            position: absolute;
            top: 0;
            left: 0;
            padding: 12px 0 0 12px;
        }

        td {
            text-align: left;
            position: relative;
            padding-top: 46px;
        }
    }
`;
