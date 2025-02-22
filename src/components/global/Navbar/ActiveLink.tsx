"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/lib/types";
export default function ActiveLink({ link }: { link: NavLink }) {
  const pathname = usePathname();

  const isActive = () => {
    if (link.dropdown) {
      return link.dropdown.some((subLink) => subLink.href === pathname);
    } else {
      return link.href === pathname;
    }
  };

  return (
    <li className={isActive() ? "active" : ""}>
      {link.dropdown ? (
        <>
          <a href="#">{link.label}</a>
          <ul className="dropdown">
            {link.dropdown.map((subLink, subIndex) => (
              <li key={subIndex}>
                {subLink.href && (
                  <Link href={subLink.href}>{subLink.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Link href={link.href || "#"}>{link.label}</Link>
      )}
    </li>
  );
}
