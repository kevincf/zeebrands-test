import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../public/zeebrand.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Header = () => {
    const [currentPage, setcurrentPage] = useState('users')
    useEffect(() => {
        const current = window.location.href.includes('users') ? 'users' : 'repo';
        setcurrentPage(current)
    },[])
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <Image src={logo} alt='Zeebrands' width={'100px'} height={'30px'} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" active={currentPage === 'users'} >User Search</Nav.Link>
                        <Nav.Link href="/repositories">Repositorie Search</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;