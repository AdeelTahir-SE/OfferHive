import OptionsBar from "@/components/optionsBar"
export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <section className="flex flex-col items-center justify-center">
            <OptionsBar/>
            {children}
        </section>
    )
}