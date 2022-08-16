import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "../../components/button/Button"
import { Container } from "../../components/container/Container"
import Tab from "../../components/tab/Tab"
import Table from "../../components/table/Table"
import {KudosContext} from "../../context/KudosContext"
import { RetroContext } from "../../context/RetroContext"
import {useParams} from "react-router-dom"
import Pagination from "../../components/pagination/Pagination"

const SprintDetails = () => {
    const {idSprint} = useParams();
    const { getRetrospectiveBySprintId } = useContext(RetroContext);
    const { getKudoboxBySprintId } = useContext(KudosContext);
    const [filter, setFilter] = useState('Retrospectiva')
    const [ currentPage, setCurrentPage] = useState(0);
    const [ pageSize, setPageSize] = useState(5);
    const [ totalCount, setTotalCount] = useState(0);
    const [ totalPages, setTotalPages] = useState(0);
    const [ list, setList] = useState([]);

    const setup = async (filter) => {
       if(filter === 'Retrospectiva'){
            const data = await getRetrospectiveBySprintId(idSprint, currentPage, pageSize);
            setTotalCount(data.totalElements);
            setTotalPages(data.totalPages);
            setList(data.content);
        } else {
            setCurrentPage(0);
            setList([])
            const data = await getKudoboxBySprintId(idSprint, currentPage, pageSize);
            console.log(data);
            setTotalCount(data.totalElements);
            setTotalPages(data.totalPages);
            setList(data.content);
        } 
    }

    useEffect(()=>{
        setup(filter)
    }, [filter, currentPage])

    const filterList = [ 'Retrospectiva', 'Kudo Box'];
    const paramsRetro =[
        {heading: 'Id', key: 'idRetrospective'},
        {heading: 'Titulo', key: 'title'},
        {heading: 'Data', key: 'occurredDate'},
        {heading: 'Status', key: 'status'},
        {heading: 'Quantidade de Items', key: 'sprint'}
    ]

    const paramsKudo = [
        {heading: 'Id', key: 'idKudoBox'},
        {heading: 'Titulo', key: 'title'},
        {heading: 'Data de encerramento', key: 'endDate'},
        {heading: 'Status', key: 'status'},
        {heading: 'Sprint', key: 'sprint'}
    ]
  return (
    <Container minHeight='calc(100vh - 100px)' backgroundColor='#12101A' flexDirection='column' alignItems='center' padding='30px 0'>
        <Container maxWidth='1120px' flexDirection='column' alignItems='flex-start' gap='30px'>
            <Container color="white" width='100%' justifyContent='space-between'>
                <Tab filterList={filterList} setFilter={setFilter} activeFilter={filter}/>
                <Button backgroundColor='white' color='black' padding='8px 16px'>
                    {filter === 'Retrospectiva' ? '+ Criar Retrospectiva' : '+ Criar Kudos Box'}
                </Button>
            </Container>
            <Table params={filter === 'Retrospectiva' ? paramsRetro: paramsKudo} list={list} path='/retrospectiva' pathKey='idRetrospective'/>
            <Pagination totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage}/>
        </Container>
    </Container>
  )
}

export default SprintDetails