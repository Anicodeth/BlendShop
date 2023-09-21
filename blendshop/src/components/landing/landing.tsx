import style from './landing.module.css'
import { useRouter } from 'next/navigation'

export default function Landing(){
    const router = useRouter()
    
    return (
        <>
        <div className ="">
        <div className = {`flex w-full flex-col ${style.mainContainer}`}>
            <div className = {`flex  w-full justify-between py-3 px-6 ${style.navBar}`}>
                <div className = "flex items-center">
                    <h1 className = 'font-bold text-3xl font-sans'>BLEND SHOP</h1>
                </div>
                <div>
                    <button
                    className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                    onClick={()=>{router.push('/login')}}
                    >Get Started</button>
                </div>
            </div>
            <div className = {`w-full flex ${style.heroContainer}`}>
                <div className = {`${style.heroLeft} w-3/5`}>
                    <div className = {`${style.glass}`}>
                        <div className = "flex flex-col justify-center h-full">
                            <h1 className = "font-bold text-5xl px-4">Get ready to populate your dreams with 3D</h1>
                            <p className = "w-full text-2xl px-4 my-2">A shop dedicated to selling and buying 3D models. Just a click away!</p>
                            <button 
                            onClick={()=>{router.push('/login')}}
                            className = "w-1/5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-4 border border-blue-500 hover:border-transparent rounded">Get Started</button>
                        </div>
                    </div>

                </div>
                <div className = {`${style.heroRight} w-2/5`}>
                    <div className = {`${style.windowOne}`}>
                        <div className = {`${style.overlay}`}></div>
                    </div>
                    <div className = {`${style.windowTwo}`}>
                        <div className = {`${style.overlay}`}></div>

                    </div>
                </div>

            </div>
        </div>
        </div>
        </>
    )
}