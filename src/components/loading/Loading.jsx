import { Container } from "../container/Container"
import { Spinner } from "./Spinner"

export const Loading = () => {
  return (
    <Container
                alignItems="center"
                justifyContent="center"
                backgroundColor="#12101a"
                height='var(--screen-size)'
            >
                <Spinner />
            </Container>
  )
}
