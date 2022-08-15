import { Form, Field, ErrorMessage } from "formik";
import MaskedInput from "react-text-mask";
import styled from "styled-components";

export const CustomForm = styled(Form)`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-size: 1.25rem;
    margin: 8px 0;
    color: ${(props) => props.color && props.color};

    :first-of-type {
        margin-top: 0;
    }
`;

export const Input = styled(Field)`
    padding: 16px;
    font-size: 1rem;
    border-radius: 8px;
    margin-bottom: 5px;
    color: ${(props) => (props.color ? props.color : "#fff")};
    background-color: ${(props) =>
        props.background ? props.background : "#3c3e44"};
    border: ${(props) => (props.border ? props.border : "1px solid #3c3e44")};

    ::placeholder {
        font-size: 1rem;
    }

    :focus {
        outline-offset: -2px;
        outline: #5454fb solid 3px;
    }
`;

export const InputMask = styled(MaskedInput)`
    padding: 16px;
    font-size: 1rem;
    border-radius: 8px;
    margin-bottom: 5px;
    color: ${(props) => (props.color ? props.color : "#fff")};
    background-color: ${(props) =>
        props.background ? props.background : "#3c3e44"};
    border: ${(props) => (props.border ? props.border : "1px solid #3c3e44")};

    ::placeholder {
        font-size: 1rem;
    }

    :focus {
        outline-offset: -2px;
        outline: #5454fb solid 3px;
    }
`;

export const ErrorInputMessage = styled(ErrorMessage)`
    color: #b51212;
`;

export const ErrorMessageContainer = styled.div`
    height: 32px;
`;
