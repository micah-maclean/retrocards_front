import { useContext } from "react"
import { useState } from "react";
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import {Title} from "../../components/title/Title"
import { Board } from "../../components/board/Board";
import { Container } from "../../components/container/Container"
import { KudosContext } from "../../context/KudosContext";
import { Button } from "../../components/button/Button";
import Pagination from "../../components/pagination/Pagination";

const KudoboxDetails = () => {
    const { getKudoboxById } = useContext(KudosContext);
    const { idKudobox } = useParams();

    const [ currentPage, setCurrentPage] = useState(0);
    const [ totalCount, setTotalCount] = useState(0);
    const [ totalPages, setTotalPages] = useState(0);
    const [ list, setList] = useState([]);
    const pageSize = 10;

    const setup = async () => {
        const data = await getKudoboxById(idKudobox, currentPage, pageSize)
        if (data) {
          setTotalCount(data.totalElements);
          setTotalPages(data.totalPages);
          setList(data.content);
        }
    }

    useEffect(()=>{
      setup()
    }, [currentPage])

    
  return(
    <Container minHeight='calc(100vh - 100px)' backgroundColor='#12101A' justifyContent='center' color="#fff">
      <Container maxWidth='1120px' width='100%' flexDirection='column' padding='30px 0'>
          <Container justifyContent='space-between' alignItems='center' margin='0px 0px 30px 0'>
            <Title>Kudobox #{idKudobox}</Title>
            <Button id='createKudocard' backgroundColor="#fff" color="black" padding="8px 16px" height='fit-content'>
                + Criar Kudocard
            </Button>
          </Container>
          <Board>
            {
              list.length > 0 && list.map(kudocard=>(
                <li key={kudocard.idKudoCard}>
                  <h3>{kudocard.title}</h3>
                  <p>{kudocard.createDate}</p>
                  <p><span>De:</span> {kudocard.sender}</p>
                  <p><span>Para:</span> {kudocard.receiver}</p>
                  <p><span>Descrição:</span>{kudocard.description}</p>
                </li>
              ))
            }
          </Board>

          {
              list.length === 0  && 
              <Title textAlign='center'>
                  Ainda não existe nenhum kudocard
              </Title>
          }

                <Pagination
                    totalCount={totalCount}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                />
      </Container>
    </Container>
  )
}

export default KudoboxDetails