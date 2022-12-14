import styled from "styled-components";

export const TabButton = styled.button`
    font-size: 1rem; 
    cursor: pointer;
    font-weight: bold;

    border: none;
    color: #fff;
    padding: 8px 24px 12px 24px;
    background-color: ${(props) => props.isActive ? "rgba(255, 255, 255, 0.1)" : "transparent"};
    border-bottom: ${(props) => props.isActive ? "2px solid #fff" : "2px solid rgba(255, 255, 255, 0.2)"};
   

   @media (max-width: 576px) {
    padding: 8px;
   }
`;
