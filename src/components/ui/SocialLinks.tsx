import { socialLinks } from "@/data/socialLinks";
import Link from "next/link";

type Props = {
  size: "small" | "large";
};

const SocialLinks = (props: Props) => {
  return (
    <>
      <div
        className={
          props.size === "small"
            ? "justify-center"
            : "justify-end" + " to-social"
        }
      >
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <Link
            key={label}
            href={href}
            className={`text-gray-400 hover:text-primary transition-colors duration-200 ${
              props.size === "small"
                ? "ml-2"
                : props.size === "large"
                ? "ml-6"
                : ""
            }`}
            aria-label={label}
          >
            <Icon
              className={
                props.size === "small"
                  ? "w-4 h-4"
                  : props.size === "large"
                  ? "w-6 h-6"
                  : ""
              }
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default SocialLinks;
