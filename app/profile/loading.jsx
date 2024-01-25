import Image from "next/image";

const LoadingProfile = () => {
  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      <Image
        src="/assets/icons/loader.svg"
        alt="Prompts are loading..."
        width={100}
        height={100}
        className="object-contain"
      />
    </div>
  );
};

export default LoadingProfile;
