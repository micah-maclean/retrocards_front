import Table from "../../components/table/Table";
import { Container } from "../../components/container/Container";
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";

const Home = () => {
  const [ currentPage, setCurrentPage] = useState(0);
  const [ pageSize, setPageSize] = useState(10);
  const [ totalCount, setTotalCount] = useState(0);
  const [ totalPages, setPages] = useState(0);

  useEffect(() => {
    console.log(currentPage)
  }, [currentPage])

  const pessoas = [
    {
      "nome": "Nikita Mazepin123",
      "dataNascimento": "2000-03-29",
      "cpf": "11111111110",
      "email": "goat@goat.com",
      "idPessoa": 1102
    },
    {
      "nome": "mc cabelinhoo",
      "dataNascimento": "2001-10-20",
      "cpf": "00002020202",
      "email": "cabelinho@gmail.com",
      "idPessoa": 1192
    },
    {
      "nome": "Lucas",
      "dataNascimento": "1991-06-16",
      "cpf": "12345646561",
      "email": "lucas@teste.com",
      "idPessoa": 1198
    },
    {
      "nome": "Zeca Pagodinho",
      "dataNascimento": "1961-12-31",
      "cpf": "33322211441",
      "email": "zeca@brahma.com.brr",
      "idPessoa": 1173
    },
    {
      "nome": "Leonardo DIas",
      "dataNascimento": "2002-05-05",
      "cpf": "55555555555",
      "email": "leonardo@gmail.com",
      "idPessoa": 1169
    },
    {
      "nome": "João Andrey",
      "dataNascimento": "1996-10-22",
      "cpf": "12345678911",
      "email": "teste@teste.com",
      "idPessoa": 1200
    },
    {
      "nome": "pepsi",
      "dataNascimento": "1989-11-10",
      "cpf": "77777777777",
      "email": "ddd@email.com",
      "idPessoa": 1185
    },
    {
      "nome": "gabrielll",
      "dataNascimento": "2003-12-21",
      "cpf": "15047372707",
      "email": "email@email.com",
      "idPessoa": 1189
    },
    {
      "nome": "Filipa2",
      "dataNascimento": "1991-02-02",
      "cpf": "03960907370",
      "email": "teste@teste.com",
      "idPessoa": 1191
    },
    {
      "nome": "Lucas Gouvêa Araujo",
      "dataNascimento": "1991-06-16",
      "cpf": "12345678910",
      "email": "lucas.gouvea@dbccompany.com.br",
      "idPessoa": 1197
    },
    {
      "nome": "Lucas Gouvêa Araujo",
      "dataNascimento": "1991-06-16",
      "cpf": "12345678910",
      "email": "lucas.gouvea@dbccompany.com.br",
      "idPessoa": 1197
    }
  ];

  const params = [
    {heading: 'Id da Pessoa', key: 'idPessoa'},
    {heading: 'Nome', key: 'nome'},
    {heading: 'Data de Nascimento', key: 'dataNascimento'},
    {heading: 'Cpf', key: 'cpf'},
    {heading: 'Email', key: 'email'},
  ];


  return (
    <Container minHeight='calc(100vh-100)' backgroundColor='#12101A' flexDirection='column' alignItems='center' padding='30px 0'>
      <Container flexDirection='column' gap='32px' color='white'>
        <Container alignItems='center' justifyContent='space-between'>
          <h1>Sprints</h1>
          <Button backgroundColor='white' color='black'> + Criar</Button>
        </Container>
        <Table list={pessoas} params={params} />
        <Pagination totalCount={totalCount} totalPages={totalPages} currentPage={currentPage} pageSize={pageSize} onPageChange={setCurrentPage} />
      </Container>
    </Container>
  )
     
}

export default Home;