import { useEffect, useState } from "react";
import { getUser } from '../api/index'
import Header from "../components/header";
import { useAppContext } from '../contexts/Context'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


const Users = () => {
    const [search, setSearch] = useState('')
    const [user, setUser] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [error, setError] = useState('')
    const { userState, setUserState } = useAppContext();



    useEffect(() => {
        const fetchUser = async () => {
            if (search.length > 3) {

                const userData = await getUser(search)
                console.log('a', userData)
                await setUser(userData)
                await setSubmited(false)
            }
            else {
                setError('Must be at least 3 characters long')
            }
        }
        if (submited) {

            fetchUser()
        }
    }, [submited, search])


    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault(e)
        setSubmited(true)
    }


    return (
        <div className="container">
            <Header />
            <div className="text-center">
                <div style={styles.formSection}>
                    <form onSubmit={handleSubmit} >
                        <div>
                            <input type="text" name="search" id="search" placeholder="Search user..." onChange={(e) => handleChange(e)} />
                            {error && <><br /><label style={{ color: 'red' }}>{error}</label></>}
                        </div>
                    </form>
                </div>


                <div>
                    {user && user.login &&
                        <div>
                            <Image src={user.avatar_url} alt='Zeebrands' width={'300px'} height={'300px'} />
                            <h2>{user.login}</h2>
                            <Card>
                                <Card.Body>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <ul style={styles.ul}>
                                                    <li>Folowers: {user.followers}</li>
                                                    <li>Public Repos: {user.public_repos}</li>
                                                    <li>Following: {user.following}</li>
                                                </ul>
                                            </Col>
                                            <Col>
                                                <ul style={styles.ul}>

                                                    <li>Email: {user.email ? user.email : 'NA'}</li>
                                                    <li>Location: {user.location ? user.location : 'NA'}</li>
                                                    <li>Bio: {user.bio ? user.bio : 'NA'}</li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </div>
                    }
                    {user === 'Not Found' && (
                        <h2>User not found!</h2>
                    )}

                </div>

            </div>
        </div>)
}

const styles = {
    formSection: {
        margin: '50px',
    },
    ul: {
        listStyle: 'none'
    }
}


export default Users;