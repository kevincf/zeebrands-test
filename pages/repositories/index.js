import { useEffect, useState } from "react";
import { getRepo } from '../api/index'
import Header from "../components/header";
import { useAppContext } from '../contexts/Context'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


const Repositories = () => {
    const [search, setSearch] = useState('')
    const [repos, setRepos] = useState(false)
    const [submited, setSubmited] = useState(false)
    const [error, setError] = useState('')
    const { userState, setUserState } = useAppContext();



    useEffect(() => {
        const fetchRepos = async () => {
            if (search.length > 3) {

                const reposList = await getRepo(search)
                console.log(reposList)
                await setRepos(reposList)
                await setSubmited(false)
            }
            else {
                setError('Must be at least 3 characters long')
            }
        }
        if (submited) {

            fetchRepos()
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
                            <input type="text" name="search" id="search" placeholder="Search repo..." onChange={(e) => handleChange(e)} />
                            {error && <><br /><label style={{ color: 'red' }}>{error}</label></>}
                        </div>
                    </form>
                </div>


                <div>
                    {repos && <>
                        <h2>Todal Count: {repos.total_count}</h2>
                        <ul style={styles.ul}>
                            {repos.items.map((repo, index) => {
                                return (
                                    <Card key={index}>
                                        <li key={`name-${index}`}>Name: {repo.name}</li>
                                        <li key={`url-${index}`}>Url: <a href={repo.url}>{repo.url}</a></li>
                                        <li key={`commits-${index}`}>Open issues: {repo.open_issues_count}</li>
                                    </Card>
                                )
                            })}
                        </ul>
                    </>
                       
                    }
                    {repos === 'Not Found' && (
                        <h2>Nothing in here!</h2>
                    )}

                </div>

            </div>
        </div>
    )
}
const styles = {
    formSection: {
        margin: '50px',
    },
    ul: {
        listStyle: 'none'
    }
}


export default Repositories;