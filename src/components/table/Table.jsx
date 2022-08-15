import { CustomTable } from "./Table.styled"

const Table = ({list, params}) => {
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
                      <tr key={i}>
                          {
                              params.map( (column, j) => (
                                  <td key={j}>
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