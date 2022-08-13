import { Form } from "formik";
import styled from "styled-components";

export const CustomForm = styled(Form) `
    display: flex;
    flex-direction: column;

    label {
        
        margin-bottom: 12px;
    }

    input{ 
        padding: 16px;
        margin-bottom: 32px;
        border-radius: 8px;
    }

    input::placeholder {
        font-size: 16px;
    }

`