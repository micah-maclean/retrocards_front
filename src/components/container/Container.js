import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection && props.flexDirection};
  justify-content: ${(props) => props.justifyContent && props.justifyContent};
  align-items: ${(props) => props.alignItems && props.alignItems};

  background-color: ${(props) =>
    props.backgroundColor && props.backgroundColor};

  border: ${(props) => props.border && props.border};
  border-radius: ${(props) => props.borderRadius && props.borderRadius};

  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};

  min-height: ${(props) => props.minHeight && props.minHeight};
  width: ${(props) => props.width && props.width};
  height: ${(props) => props.height && props.height};

  overflow: ${(props) => props.overflow && props.overflow};
`;
