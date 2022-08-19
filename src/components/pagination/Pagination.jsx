//Import de component
import { Button } from "../button/Button";
import { Container } from "../container/Container";

const Pagination = ({
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    onPageChange,
}) => {
    return (
        <Container justifyContent="space-between" color="white" width="100%">
            <Button
                id="previous"
                visibility={currentPage === 0 ? "hidden" : "visible"}
                border="1px solid #fff"
                backgroundColor="transparent"
                color="#fff"
                onClick={() => onPageChange(currentPage - 1)}
            >
                Anterior
            </Button>

            {totalCount > 0 && (
                <p>
                    Mostrando do {currentPage * pageSize + 1} ao{" "}
                    {pageSize * (currentPage + 1) > totalCount
                        ? totalCount
                        : pageSize * (currentPage + 1)}{" "}
                    de {totalCount} itens
                </p>
            )}

            <Button
                id="next"
                visibility={
                    currentPage + 1 >= totalPages ? "hidden" : "visible"
                }
                border="1px solid #fff"
                backgroundColor="transparent"
                color="#fff"
                onClick={() => onPageChange(currentPage + 1)}
            >
                Próximo
            </Button>
        </Container>
    );
};

export default Pagination;
