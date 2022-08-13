import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    border: ${ props => props.border ? props.border: 'none'};
    border-radius: ${ props => props.borderRadius ? props.borderRadius: 'none'};
    flex-direction: ${ props => props.flexDirection ? props.flexDirection: 'row'};
    justify-content: ${ props => props.justifyContent ? props.justifyContent: 'center'};
    align-items: ${ props => props.alignItems && props.alignItems};
    background-color: ${ props => props.backgroundColor && props.backgroundColor};
    padding: ${ props => props.padding && props.padding };
    min-height: ${ props => props.minHeight && props.minHeight };
    width: ${ props => props.width && props.width};
    height: ${ props => props.height && props.height };
    overflow: ${ props => props.overflow && props.overflow };
`;
