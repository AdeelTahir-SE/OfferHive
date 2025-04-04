import Image from "next/image";

export default function PeopleCard({ image, name, onClick }: { image: string; name: string; onClick: (name: string, image: string) => void }) {
    return (
        <section
            className="flex flex-row items-center justify-start gap-4 p-2 cursor-pointer bg-white shadow-md rounded-lg w-60 hover:bg-gray-200 transition"
            onClick={() => onClick(name, image)}
        >
            <Image src={image} alt={name} width={50} height={50} className="rounded-full" />
            <h2 className="text-lg font-bold text-yellow-700">{name}</h2>
        </section>
    );
}
