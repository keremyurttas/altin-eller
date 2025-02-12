import { type FC } from "react";
import { type LucideIcon } from "lucide-react";
import { socialLinks } from "@/data/socialLinks";
type SocialLink = {
  icon: LucideIcon;
  href: string;
  label: string;
};

interface SocialLinksProps {
  socialLinks: SocialLink[];
}
type Props = {
  size: "small" | "large";
};

const SocialLinks = (props: Props) => {
  return (
    <>
      <div className="to-social">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            className={`text-gray-400 hover:text-primary transition-colors duration-200 ${props.size==="small"? "ml-2": props.size==="large"? "ml-6": ""}`}
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
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialLinks;
