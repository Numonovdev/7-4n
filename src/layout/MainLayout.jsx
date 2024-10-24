import Header from "../pages/Header"

function MainLayout({children}){
    return(
        <>
        <Header/>
           {
            children
           }
        </>
    )
}

export default MainLayout