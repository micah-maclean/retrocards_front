import { useState } from "react";
import { Button } from "../button/Button";
import { Container } from "../container/Container";
import { TabButton } from "./TabButton";

const Tab = ({filterList, setFilter, activeFilter}) => {

  return (
    <Container>
        {
            filterList.map((filter, i) => (
                <TabButton backgroundColor='black' isActive={filter === activeFilter} onClick={()=> setFilter(filter)} key={i}>{filter}</TabButton>
            ))
        }
    </Container>
  )
}

export default Tab