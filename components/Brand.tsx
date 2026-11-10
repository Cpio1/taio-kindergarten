import Image from "next/image";
import { LogoMark } from "./Decorations";

/** Логотип болса — соны, болмаса стандартты белгіні көрсетеді */
export default function Brand({ logo, size = 40 }: { logo: string | null; size?: number }) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt=""
        width={size}
        height={size}
        className="rounded-xl object-contain"
        style={{ width: size, height: size }}
        unoptimized={logo.endsWith(".svg")}
      />
    );
  }
  return (
    <span className="block shrink-0" style={{ width: size, height: size }}>
      <LogoMark className="h-full w-full" />
    </span>
  );
}
