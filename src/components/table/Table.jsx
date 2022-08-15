import { CustomTable } from "./Table.styled"
import {useNavigate} from "react-router-dom"
import { useState } from "react";

const Table = ({list, params}) => {
    const teste= '/sprint';
    const teste1 = 'idSprint';

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
                      <tr key={i}>
                            {
                              params.map( (column, j) => ( 
                                <td key={j} onClick={() => navigate(`${teste}`)}>
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