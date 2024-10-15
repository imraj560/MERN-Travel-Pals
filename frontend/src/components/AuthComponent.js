import Header from '../includes/header/Header'
import Footer from '../includes/footer/Footer'

export const AuthComponent = ({children})=>{

    return (

        <>
        <Header />

        {children}

        <Footer/>
        </>
        

    )
}