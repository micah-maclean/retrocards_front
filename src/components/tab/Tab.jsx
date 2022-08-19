//Import de component
import { Container } from "../container/Container";
import { TabButton } from "./TabButton";

const Tab = ({ filterList, setFilter, activeFilter }) => {
    return (
        <Container>
            {filterList.map((filter, i) => (
                <TabButton
                    backgroundColor="black"
                    isActive={filter.value === activeFilter}
                    onClick={() => setFilter(filter.value)}
                    key={i}
                >
                    {filter.name}
                </TabButton>
            ))}
        </Container>
    );
};

export default Tab;
