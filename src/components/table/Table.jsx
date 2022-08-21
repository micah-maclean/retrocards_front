//Import de router
import { useNavigate } from "react-router-dom";
//Import de styled
import { CustomTable } from "./Table.styled";
//Import para formatar a data
import { formatDateToRender } from "../../utils/masks";
import { Button } from "../button/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container } from "../container/Container";

const Table = ({ list, params, actions, path, pathKey }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const Status = {
        CREATE: "Criado",
        IN_PROGRESS: "Em Andamento",
        FINISHED: "Concluido",
    };

    const Role = {
        ROLE_ADMIN: "Admin",
        ROLE_FACILITATOR: "Facilitador",
        ROLE_MEMBER: "Membro",
    };

    return (
        <CustomTable>
            <thead>
                <tr>
                    {params.map((column, i) => (
                        <th key={i}>{column.heading}</th>
                    ))}
                    {actions && user.role !== "ROLE_MEMBER" && <th>Ações</th>}
                </tr>
            </thead>
            <tbody>
                {list.map((row, i) => (
                    <tr key={i}>
                        {params.map((column, j) => (
                            <>
                                <td
                                    data-title={column.heading}
                                    key={j}
                                    onClick={() =>
                                        navigate(`${path}/${row[pathKey]}`)
                                    }
                                >
                                    {column.key.includes("Date")
                                        ? formatDateToRender(row[column.key])
                                        : column.key === "status"
                                        ? Status[row[column.key]]
                                        : column.key === "role"
                                        ? Role[row[column.key]]
                                        : row[column.key]}
                                </td>
                            </>
                        ))}
                        {actions && user.role !== "ROLE_MEMBER" && (
                            <>
                                <td>
                                    <Container justifyContent="space-between">
                                        {actions.map((button, i) => (
                                            <>
                                                {row.status ===
                                                    button.status && (
                                                    <Button
                                                        backgroundColor="transparent"
                                                        color={button.iconColor}
                                                        padding="4px"
                                                        fontSize="20px"
                                                        onClick={() =>
                                                            button.function(
                                                                row[
                                                                    button.param
                                                                ],
                                                                row.status
                                                            )
                                                        }
                                                    >
                                                        {button.icon}
                                                    </Button>
                                                )}
                                            </>
                                        ))}
                                    </Container>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </CustomTable>
    );
};
export default Table;

{
    /* {row.status === "CREATE" && (
                                            <Button
                                                backgroundColor="transparent"
                                                color="#fff"
                                                onClick={() =>
                                                    button.function(
                                                        row[button.param],
                                                        row.status
                                                    )
                                                }
                                            >
                                                PLAY
                                            </Button>
                                        )}
                                        {row.status === "FINISHED" && (
                                            <Button
                                                backgroundColor="transparent"
                                                color="#fff"
                                                onClick={() =>
                                                    button.navigate(
                                                        row[button.param]
                                                    )
                                                }
                                            >
                                                X
                                            </Button>
                                        )} */
}
