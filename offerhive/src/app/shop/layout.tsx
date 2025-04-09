import SideBar from "@/components/sideBar"
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