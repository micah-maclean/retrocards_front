import styled from "styled-components";

export const CustomTable = styled.table`
    border-radius: 8px;
    th{
        text-align: left; 
    }

    thead {
        background-color: #414048;
    }

    tbody {
        background-color: #292730;

        tr:hover {
            cursor: pointer;
            background-color: #5454FB;
        }
    }

    td, th{
        color: white;
    }

    td, th{

        padding: 16px 24px;
    }
`