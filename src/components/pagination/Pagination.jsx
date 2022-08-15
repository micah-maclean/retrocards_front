import { Button } from "../button/Button"
import { Container } from "../container/Container"

const Pagination = ({totalCount, totalPages, currentPage, pageSize, onPageChange}) => {
  return (
    <Container justifyContent='space-between'>
        <p>
            Showing {(currentPage * pageSize) + 1} to {pageSize * (currentPage + 1) > totalCount ? totalCount : pageSize * (currentPage + 1) } of {totalCount}
        </p>

        <Container gap='16px'>
            { currentPage > 0 &&
                    <Button backgroundColor='white' color='black' onClick={() => onPageChange(currentPage - 1)}>Previous</Button>
            }
            { currentPage + 1 < totalPages &&
                <Button  backgroundColor='white' color='black' onClick={() => onPageChange(currentPage + 1)}>Next</Button>
            }
        </Container>
      
    </Container>
  )
}

export default Pagination