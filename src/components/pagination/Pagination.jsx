import { Button } from "../button/Button"
import { Container } from "../container/Container"

const Pagination = ({totalCount, totalPages, currentPage, pageSize, onPageChange}) => {
  return (
    <Container justifyContent='space-between' color='white' width='100%'>
        <Button visibility={currentPage === 0 ? 'hidden' : 'visible'} backgroundColor='white' color='black' onClick={() => onPageChange(currentPage - 1)}>Previous</Button>

        <p>
            Showing {(currentPage * pageSize) + 1} to {pageSize * (currentPage + 1) > totalCount ? totalCount : pageSize * (currentPage + 1) } of {totalCount}
        </p>

        <Button visibility={currentPage + 1 === totalPages ? 'hidden' : 'visible'} backgroundColor='white' color='black' onClick={() => onPageChange(currentPage + 1)}>Next</Button>
    </Container>
  )
}

export default Pagination