 import Link from "next/link"
 async function SideBar(){
return (
    <section className="flex flex-col items-center justify-center h-screen left-0 border-2 rounded-xl bg-gray-100 max-w-20 absolute">
        
        <ul className="flex flex-col items-center justify-center space-y-4">
            <li className="text-sm font-semibold bg-gray-400 rounded-2xl my-2 p-2"><Link href="/dashboard">Dashboard</Link></li>
            <li className="text-sm font-semibold bg-gray-400 rounded-2xl my-2 p-2"><Link href="/people">People</Link></li>
            <li className="text-sm font-semibold bg-gray-400 rounded-2xl my-2 p-2"><Link href="/shop">Shop</Link></li>
            <li className="text-sm font-semibold bg-gray-400 rounded-2xl my-2 p-2"><Link href="/logout">logout</Link></li>

        </ul>


    </section>
)
 }
export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <SideBar/>
            <section className="left-20 ">
            {children}
            </section>
        </section>
    )
}