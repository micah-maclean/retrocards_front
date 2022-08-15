import { Button } from "../button/Button"
import { Container } from "../container/Container"

const Pagination = ({totalCount, currentPage, pageSize, onPageChange}) => {
  return (
    <Container justifyContent='space-between'>
        <p>
            Showing 1 to 5 of {totalCount}
        </p>

        <Container gap='16px'>
            { currentPage > 0 &&
                    <Button backgroundColor='white' color='black' onClick={() => onPageChange(currentPage - 1)}>Previous</Button>
            }
                <Button  backgroundColor='white' color='black' onClick={() => onPageChange(currentPage + 1)}>Next</Button>
        </Container>
      
    </Container>
  )
}

export default Pagination