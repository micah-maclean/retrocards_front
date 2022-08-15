import { ErrorInputMessage, ErrorMessageContainer } from "./CustomForm";

const CustomErrorMessage = ({ name }) => {
    return (
        <ErrorMessageContainer>
            <ErrorInputMessage name={name} component="span" />
        </ErrorMessageContainer>
    );
};
export default CustomErrorMessage;
