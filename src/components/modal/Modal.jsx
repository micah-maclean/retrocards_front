import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../components/modal/Modal.css";
import { Container } from "../container/Container";
import { Title } from "../title/Title";
import { Button } from "../button/Button";

export const Modal = (paramModal) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <Container
                    width="450px"
                    height="180px"
                    flexDirection="column"
                    justifyContent="space-between"
                    backgroundColor="#2a2831"
                    color="#fff"
                    padding="32px"
                    borderRadius="8px"
                >
                    <Title fontSize="1.25rem">{paramModal.message}</Title>
                    <Container justifyContent="space-between">
                        <Button
                            width="30%"
                            backgroundColor="transparent"
                            border="1px solid #fff"
                            backgroundColorHover="#5454fb"
                            borderHover="1px solid #5454fb"
                            onClick={onClose}
                            id='close-modal'
                        >
                            Cancelar
                        </Button>
                        <Button
                            width="30%"
                            backgroundColor="#fff"
                            border="1px solid #fff"
                            color="#12101a"
                            backgroundColorHover="#5454fb"
                            colorHover="#fff"
                            borderHover="1px solid #5454fb"
                            onClick={() => {
                                paramModal.function(...paramModal.values);
                                onClose();
                            }}
                            id='confirm-modal'
                        >
                            {paramModal.confirmText}
                        </Button>
                    </Container>
                </Container>
            );
        },
    });
};
