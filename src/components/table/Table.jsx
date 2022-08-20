//Import de router
import { useNavigate } from "react-router-dom";
//Import de styled
import { CustomTable } from "./Table.styled";
//Import para formatar a data
import { formatDateToRender } from "../../utils/masks";

const Table = ({ list, params, actions, path, pathKey }) => {
    const navigate = useNavigate();

    const Status ={
        CREATE: <span style={{color:'green'}}>Criado</span>,
        IN_PROGRESS: <span style={{color:'blue'}}>Em Andamento</span>,
        FINISHED: <span style={{color:'blue'}}>Concluido</span> 
    }

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
                                        : column.key === 'status' ? Status[row[column.key]]
                                        : row[column.key]
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
