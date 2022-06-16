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
    label: "Foundations",
    url: "/foundations",
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
  {
    label: "Contributing",
    url: "/contributing",
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
                <span>{label}</span>
              </a>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default NavItems;
