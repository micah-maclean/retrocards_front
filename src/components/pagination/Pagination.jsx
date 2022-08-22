//Import de component
import { Button } from "../button/Button";
import { Container } from "../container/Container";
import { Paragraph } from "../paragraph/Paragraph";

const Pagination = ({
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    onPageChange,
}) => {
    return (
        <Container
            justifyContent="space-between"
            width="100%"
            gap="16px"
        >
            <Button
                id="previous"
                visibility={currentPage === 0 ? "hidden" : "visible"}
                border="1px solid #fff"
                backgroundColor="transparent"
                onClick={() => onPageChange(currentPage - 1)}
            >
                Anterior
            </Button>

            {totalCount > 0 && (
                <Paragraph textAlign="center">
                    Mostrando do {currentPage * pageSize + 1} ao{" "}
                    {pageSize * (currentPage + 1) > totalCount
                        ? totalCount
                        : pageSize * (currentPage + 1)}{" "}
                    de {totalCount} itens
                </Paragraph>
            )}

            <Button
                id="next"
                visibility={
                    currentPage + 1 >= totalPages ? "hidden" : "visible"
                }
                border="1px solid #fff"
                backgroundColor="transparent"
                onClick={() => onPageChange(currentPage + 1)}
            >
                Próximo
            </Button>
        </Container>
    );
};

export default Pagination;
