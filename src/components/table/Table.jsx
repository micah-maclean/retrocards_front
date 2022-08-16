import { CustomTable } from "./Table.styled"
import {useNavigate} from "react-router-dom"

const Table = ({list, params, path, pathKey}) => {
    const navigate = useNavigate();

    return (
     <CustomTable>
          <thead>
              <tr>
                {
                  params.map( (column, i) => (
                      <th key={i}>{column.heading}</th>
                  ))
                }  
              </tr> 
          </thead>
          <tbody>
              {
                  list.map( (row, i) => (
                      <tr key={i} onClick={() => navigate(`${path}/${row[pathKey]}`)}>
                            {
                              params.map( (column, j) => ( 
                                <td data-title={column.heading} key={j}>
                                  {/* {
                                    column.key === 'status' && row[column.key] === 'CREATE' ? 'criado' : row[column.key] === 'IN_PROGRESS' ? 'em andamento' : 'concluido'
                                  } */}
                                    {row[column.key]}
                                </td>
                              ))
                          }
                      </tr>
                  ))
              }
          </tbody>
     </CustomTable>
    )
  }
  export default Table