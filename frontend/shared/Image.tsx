import Image from "next/image";

export default function CustomImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return <Image fill src={src} alt={alt} />;
}
