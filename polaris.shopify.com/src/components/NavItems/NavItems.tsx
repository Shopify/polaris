import Link from "next/link";

const headerNavItems: {
  label: string;
  url: string;
}[] = [
  {
    label: "Getting started",
    url: "/resources",
  },
  {
    label: "Guidelines",
    url: "/guidelines/foundations/experience-values",
  },
  {
    label: "Components",
    url: "/components",
  },
  {
    label: "Tokens",
    url: "/tokens/colors",
  },
  {
    label: "Icons",
    url: "/icons",
  },
];

interface Props {
  currentSection?: string;
  handleCloseMenu?: () => void;
}

function NavItems({ currentSection, handleCloseMenu }: Props) {
  return (
    <>
      {headerNavItems.map(({ url, label }) => {
        const isCurrent =
          currentSection && url.startsWith(currentSection) ? "page" : false;

        return (
          <li key={url}>
            <Link href={url} passHref>
              <a aria-current={isCurrent} onClick={handleCloseMenu}>
                {label}
              </a>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default NavItems;
