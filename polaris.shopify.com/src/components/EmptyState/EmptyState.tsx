import Image from "next/image";

import styles from "./EmptyState.module.scss";

interface Props {
  title: string;
  icon: string;
  description: string;
  children: React.ReactNode;
}

function Page({ icon, children }: Props) {
  return (
    <div className={styles.EmptyState}>
      <div className={styles.Icon}>
        <Image src={`/icons/${icon}.svg`} width={100} height={100} alt="" />
      </div>
      {children}
    </div>
  );
}

export default Page;
