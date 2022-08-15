import styled from "styled-components";
import {FcCalendar} from 'react-icons/fc'

export const Span = styled.span`
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 30px;
`

export const Calendar = styled(FcCalendar)`
    font-size: 20px;
    position: absolute;
    top: ${(props) => props.top&& props.top};
    right: ${(props) => props.right && props.right};
`