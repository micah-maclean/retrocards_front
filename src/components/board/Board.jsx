import styled from "styled-components";

export const Board = styled.ul`
  width: 100%;
  height: 100;
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
    
  li{
    aspect-ratio: 1;
    color: #fff;
    padding: 20px;
    border-radius: 8px;
    background-color: rgba( 255, 255, 255, 0.1);
    width: 100%;
    height: fit-content;
    
    h3{
      margin-bottom: 24px;
    }

    p{
      margin-bottom: 16px;
      span{
        font-weight: bold;
        margin-right: 8px;
      }
    }
  }

  @media (max-width: 1000px){
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px){
    grid-template-columns: 1fr;
  }
`;