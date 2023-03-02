import Image from "next/image"

export const Logo = () => {
  return (
    <div className="flex cursor-pointer select-none items-center tracking-wide">
      <Image src='/img/sun.svg' width={25} height={25} alt='motype logo' />
      <span className="mr-8 ml-2 text-xl font-bold tracking-wide">motype</span>
    </div>
  )
}