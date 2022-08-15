import styled from "styled-components";

export const Container = styled.div`
  display: ${(props) => props.flex ? props.flex : 'flex'};
  flex-direction: ${(props) => props.flexDirection && props.flexDirection};
  justify-content: ${(props) => props.justifyContent && props.justifyContent};
  align-items: ${(props) => props.alignItems && props.alignItems};

  background-color: ${(props) =>
    props.backgroundColor && props.backgroundColor};
  color: ${(props) => props.color && props.color};

  border: ${(props) => props.border && props.border};
  border-radius: ${(props) => props.borderRadius && props.borderRadius};

  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};
  gap: ${(props) => props.gap && props.gap};

  min-height: ${(props) => props.minHeight && props.minHeight};
  max-width: ${(props) => props.maxWidth && props.maxWidth};
  width: ${(props) => props.width && props.width};
  height: ${(props) => props.height && props.height};

  position: ${(props) => props.position && props.position};

  overflow: ${(props) => props.overflow && props.overflow};
`;
