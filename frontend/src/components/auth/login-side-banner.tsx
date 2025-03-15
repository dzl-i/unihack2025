import Image from "next/image"

export function LoginSideBanner() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0">
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image 
            src="/login-side-banner.svg"
            alt="Jappy Login Banner"
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  )
}