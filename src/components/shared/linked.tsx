import Link from "next/link"

export const Linked = ({
  href,
  children,
    ...rest
}: any) => {
    return (
        <Link
            href={href}
            className="inline-block mt-2 bg-[#1466ff] text-white px-5 py-2 rounded text-[16px]"
            {...rest}
        >
            {children}
        </Link>
    )
}
