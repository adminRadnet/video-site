import {Container} from 'react-bootstrap'

const Page = ({children}) => {
    return (
        <div>
            <Container>
                {children}
            </Container>
        </div>
    )
}

export default Page