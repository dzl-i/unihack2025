import Image from "next/image";

export default function Logo({ width = 24, height = 24 }) {
  return (
    <Image src="/logo.svg" alt="Jappy Logo" width={width} height={height} />
  );
}
