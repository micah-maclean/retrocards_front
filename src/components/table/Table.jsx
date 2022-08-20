//Import de router
import { useNavigate } from "react-router-dom";
//Import de styled
import { CustomTable } from "./Table.styled";
//Import para formatar a data
import { formatDateToRender } from "../../utils/masks";
import { Button } from "../button/Button";

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
                    {
                        actions && <th>
                            Ações
                        </th>
                    }
                </tr>
                
            </thead>
            <tbody>
                {list.map((row, i) => (
                    <tr
                        key={i}
                        
                    >
                        {params.map((column, j) => (
                            <>
                                <td data-title={column.heading} key={j} onClick={() => navigate(`${path}/${row[pathKey]}`)}>
                                    {
                                        column.key.includes("Date")
                                            ? formatDateToRender(row[column.key])
                                            : column.key === 'status' ? Status[row[column.key]]
                                            : row[column.key]
                                    }
                                </td>
                                
                            </>))}
                                <td>
                                    { actions.map( button => (
                                        <Button onClick={() => button.function(row[button.param])}>
                                            {button.icon}
                                        </Button>
                                        ))
                                    }
                                </td>
                    </tr>
                ))}
            </tbody>
        </CustomTable>
    );
};
export default Table;
