import Header from '../includes/header/Header'

export const AuthComponent = ({children})=>{

    return (

        <>
        <Header />

        {children}
        </>
        

    )
}