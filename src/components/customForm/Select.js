import { useState } from "react";
import {
    SelectContainer,
    SelectLabelButton,
    DropdownStyle,
    DropdownItem,
    Dropdown,
    Label,
} from "./CustomForm";

const Select = ({ label, values, onChange }) => {
    const [currentValue, setCurrentValue] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleValueChange = (value) => {
        setCurrentValue(value);
    };
    const handleChange = (value) => {
        handleValueChange(value.name);
        // call method, if it exists
        if (onChange) onChange(value.value);
        // close, after all tasks are finished
        handleClose();
    };

    return (
        <>
            <SelectContainer>
                <SelectLabelButton onClick={handleOpen}>
                    {currentValue !== "" ? currentValue : label}
                </SelectLabelButton>
                <Dropdown top="12px" right="25px" />
                <DropdownStyle isVisible={open}>
                    {values.map((value, index) => (
                        <DropdownItem
                            onClick={() => handleChange(value)}
                            active={value.name === currentValue}
                            key={index}
                        >
                            {value.name}
                        </DropdownItem>
                    ))}
                </DropdownStyle>
            </SelectContainer>
        </>
    );
};
export default Select;
