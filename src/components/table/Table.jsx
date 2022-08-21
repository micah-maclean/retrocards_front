//Import de router
import { useNavigate } from "react-router-dom";
//Import de styled
import { CustomTable } from "./Table.styled";
//Import para formatar a data
import { formatDateToRender } from "../../utils/masks";
import { Button } from "../button/Button";

const Table = ({ list, params, actions, path, pathKey }) => {
    const navigate = useNavigate();

    const Status = {
        CREATE: <span style={{ color: "green" }}>Criado</span>,
        IN_PROGRESS: <span style={{ color: "blue" }}>Em Andamento</span>,
        FINISHED: <span style={{ color: "white" }}>Concluido</span>,
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
                    {actions && <th>Ações</th>}
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
                        {actions && (
                            <>
                                {actions.map((button, i) => (
                                    <td key={i}>
                                        {row.status === "IN_PROGRESS" && (
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
                                                ||
                                            </Button>
                                        )}
                                        {row.status === "CREATE" && (
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
                                        )}
                                    </td>
                                ))}
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </CustomTable>
    );
};
export default Table;
