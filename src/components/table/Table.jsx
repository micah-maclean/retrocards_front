//Import de router
import { useNavigate } from "react-router-dom";
//Import de styled
import { CustomTable } from "./Table.styled";
//Import para formatar a data
import { formatDateToRender } from "../../utils/masks";

const Table = ({ list, params, path, pathKey }) => {
    const navigate = useNavigate();

    return (
        <CustomTable>
            <thead>
                <tr>
                    {params.map((column, i) => (
                        <th key={i}>{column.heading}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {list.map((row, i) => (
                    <tr
                        key={i}
                        onClick={() => navigate(`${path}/${row[pathKey]}`)}
                    >
                        {params.map((column, j) => (
                            <td data-title={column.heading} key={j}>
                                {
                                    column.key.includes("Date")
                                        ? formatDateToRender(row[column.key])
                                        : row[column.key]
                                    /* {
                                    column.key === 'status' && row[column.key] === 'CREATE' ? 'criado' : row[column.key] === 'IN_PROGRESS' ? 'em andamento' : 'concluido'
                                  } */
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </CustomTable>
    );
};
export default Table;
