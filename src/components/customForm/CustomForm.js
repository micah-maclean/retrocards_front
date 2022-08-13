import { Form } from "formik";
import styled from "styled-components";

export const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }

  input {
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 5px;
    border: 1px solid #000;
  }

  input::placeholder {
    font-size: 16px;
  }

  input:focus {
    outline: #000 solid 1px;
  }

  span {
    color: #b51212;
  }
`;
