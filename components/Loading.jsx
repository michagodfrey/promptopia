import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full flex-center mt-8">
        <Image 
            src="/assets/icons/loader.svg"
            alt="Prompts are loading..."
            width={100}
            height={100}
            className="object-contain"
        />
    </div>
  )
}

export default Loading