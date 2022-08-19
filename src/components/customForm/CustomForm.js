import styled from "styled-components";
//Import referente ao Formik
import { Form, Field, ErrorMessage } from "formik";
//Import referente a dependencia para colocar mask no input
import MaskedInput from "react-text-mask";
//Import referente ao icons
import { FcCalendar } from "react-icons/fc";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

export const CustomForm = styled(Form)`
    max-width: ${props => props.maxWidth && props.maxWidth};
    width: ${(props) => (props.width ? props.width : "100%")};
    color: ${(props) => (props.color ? props.color : "inherit")};
    display: flex;
    flex-direction: column;

    select {
        appearance: none;
    }
`;

export const Label = styled.label`
    font-size: 1.25rem;
    margin: ${(props) => (props.margin ? props.margin : "8px 0")};
    color: ${(props) => (props.color ? props.color : "inherit")};

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
    width: ${(props) => props.width && props.width};

    ::placeholder {
        font-size: 1rem;
    }

    :focus {
        outline-offset: -2px;
        outline: #5454fb solid 3px;
    }
`;

export const InputMask = styled(MaskedInput)`
    width: ${(props) => props.width && props.width};
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

export const Calendar = styled(FcCalendar)`
    font-size: 20px;
    position: absolute;
    top: ${(props) => props.top && props.top};
    right: ${(props) => props.right && props.right};
`;

export const Dropdown = styled(IoMdArrowDropdown)`
    font-size: 32px;
    color: #292730;
    position: absolute;
    top: ${(props) => props.top && props.top};
    right: ${(props) => props.right && props.right};
`;

export const Plus = styled(AiOutlinePlus)`
    color: #12101a;
`;

export const ErrorInputMessage = styled(ErrorMessage)`
    color: #b51212;
`;

export const ErrorMessageContainer = styled.div`
    height: 32px;
`;

export const Checkbox = styled(Field)`
    all: unset;
    background-color: #3c3e44;
    display: flex;
    align-items: center;
    border-radius: 8px;
    width: 26px;
    height: 26px;
    margin-right: 10px;
    position: relative;

    :checked {
        background-color: #5454fb;
        color: #fff;
    }

    :checked::before {
        content: "✓";
        position: absolute;
        left: 8px;
    }
`;

export const SelectContainer = styled.div`
    position: relative;
    margin: 0;
`;

export const SelectLabelButton = styled.div`
    padding: 16px;
    font-size: 1rem;
    border-radius: 8px;
    margin-bottom: 5px;
    min-width: 7rem;
    font-weight: 500;
    background-color: #3c3e44;
    color: #fff;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #3c3e44;
    cursor: pointer;
    transition: 0.3s ease;
`;

export const DropdownStyle = styled.div`
    width: 100%;
    font-size: 1rem;
    position: absolute;
    top: 60px;
    left: 0;
    max-height: ${(props) => (props.isVisible ? "10vmax" : "40px")};
    min-width: 10rem;
    padding: 0.4rem;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #3c3e44;
    border: 1px solid #3c3e44;
    transition: max-height 0.2s ease;
    overflow-y: scroll;
    visibility: ${(props) => (props.isVisible ? "auto" : "hidden")};
    z-index: 1;
`;

export const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0.15rem 0;
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
    font-weight: ${(props) => (props.active ? "500" : "400")};
    color: ${(props) => (props.active ? "#5454fb" : "#fff")};
    border-radius: 0.3rem;
    cursor: pointer;

    &:hover,
    :focus,
    :focus:hover {
        background-color: #5454f4;
        color: #fff;
        outline: none;
    }
`;
