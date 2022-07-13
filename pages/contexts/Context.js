import React, { useContext, createContext } from 'react';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    const [userState, setUserState] = React.useState({});
    const [repositoriesState, setRepositoriesState] = React.useState([]);
    React.useEffect(() => {

    }, []);


    const values = React.useMemo(() => (
        {
            userState,
            setUserState,
            repositoriesState,
            setRepositoriesState,
        }),
        [
            userState, repositoriesState]);

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}


export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        console.error('Error deploying App Context!!!');
    }

    return context;
}

export default useAppContext;