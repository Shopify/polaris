import styles from "./ResourcesPage.module.scss";
import { BrowseIcon, FigmaIcon, GitHubIcon, InstallIcon } from "./icons";
import Container from "../Container";
import Link from "next/link";
import { className } from "../../utils/various";
import componentsImage from "./components.png";
import tokensImage from "./tokens.png";
import iconsImage from "./icons.png";
import Image from "../Image";

interface Props {}

function ResourcesPage({}: Props) {
  return (
    <div className={styles.ResourcesPage}>
      <Container>
        <div className={styles.Hero}>
          {/* <div className={styles.Illustration}>
            <Illustration />
          </div> */}
          <div className={styles.Text}>
            <h1>
              A starter kit
              <br /> for reimagining
              <br /> commerce.
            </h1>
            <p>{`Our design system helps us work together to build a great experience for all of Shopify’s merchants.`}</p>
          </div>
        </div>
      </Container>

      <div className={className(styles.Line, styles.FirstLine)}></div>

      <Container className={className(styles.Step, styles.Foundations)}>
        <h2>Explore the foundations</h2>
        <p>{`Polaris is a carefully crafted design system built to solve very specific problems. By learning how the system works, you'll be able to design the best possible solutions for all merchants.`}</p>
        <Link href="/foundations">Start learning</Link>
      </Container>
      <div className={styles.Line}></div>

      <div className={className(styles.Step, styles.BuildingBlocks)}>
        <Container>
          <h2>Play with the building blocks</h2>

          <div className={styles.Blocks}>
            <div className={styles.Block}>
              <div className={styles.Text}>
                <h3>Components</h3>
                <p className={styles.Description}>
                  The core library that give you access to components, styles
                  and everything else you need to build a great app with
                  Polaris.
                </p>
                <Links
                  links={[
                    {
                      icon: "browse",
                      label: "Browse components",
                      url: "/components",
                    },
                    {
                      icon: "github",
                      label: "Repo",
                      url: "https://github.com/Shopify/polaris/tree/main/polaris-react",
                    },
                    {
                      icon: "figma",
                      label: "Library",
                      url: "https://www.figma.com/community/file/1111360433678236702",
                    },
                  ]}
                />
              </div>
              <div className={styles.Image}>
                <Image
                  src={componentsImage}
                  alt="Media card and date picker components"
                  width={555 * 1.5}
                  height={430 * 1.5}
                />
              </div>
            </div>

            <div className={styles.Block}>
              <div className={styles.Text}>
                <h3>Tokens</h3>
                <p className={styles.Description}>
                  Tokens are the building blocks for extending Polaris. Combine
                  colors, spacing, typography and more into entierly new
                  experiences.
                </p>
                <Links
                  links={[
                    {
                      icon: "browse",
                      label: "Browse tokens",
                      url: "/tokens/colors",
                    },
                    {
                      icon: "github",
                      label: "Repo",
                      url: "https://github.com/Shopify/polaris/tree/main/polaris-tokens",
                    },
                    {
                      icon: "figma",
                      label: "Library",
                      url: "https://www.figma.com/community/file/1111359207966840858",
                    },
                  ]}
                />
              </div>

              <div className={styles.Image}>
                <Image
                  src={tokensImage}
                  alt="A card containing a color preview, a token name and a description."
                  width={555 * 1.5}
                  height={430 * 1.5}
                />
              </div>
            </div>

            <div className={styles.Block}>
              <div className={styles.Text}>
                <h3>Icons</h3>
                <p className={styles.Description}>
                  The Polaris icon library contains 400+ carefully designed
                  icons focused on commerce and entrepreneurship.
                </p>
                <Links
                  links={[
                    {
                      icon: "browse",
                      label: "Browse icons",
                      url: "/icons",
                    },
                    {
                      icon: "github",
                      label: "Repo",
                      url: "https://github.com/Shopify/polaris/tree/main/polaris-icons",
                    },
                    {
                      icon: "figma",
                      label: "Library",
                      url: "https://www.figma.com/community/file/1110993965108325096",
                    },
                  ]}
                />
              </div>

              <div className={styles.Image}>
                <Image
                  src={iconsImage}
                  alt="A grid containing icons from Polaris"
                  width={555 * 1.5}
                  height={430 * 1.5}
                />
              </div>
            </div>
          </div>
        </Container>

        <div className={styles.Line}></div>

        <div className={className(styles.Step, styles.PowerUps)}>
          <Container>
            <h2>Get the power ups</h2>
            <div className={styles.PolarisForVSCode}>
              <div className={styles.Text}>
                <h3>Polaris for VS Code</h3>
                <p className={styles.Description}>
                  Automatic autocompletion for Polaris tokens, right inside your
                  favorite code editor.
                </p>
                <Links
                  links={[
                    {
                      icon: "install",
                      label: "Get the extension",
                      url: "https://marketplace.visualstudio.com/items?itemName=Shopify.polaris-for-vscode",
                    },
                  ]}
                />
              </div>

              <div className={styles.Video}>
                <video
                  width="2250"
                  height="1440"
                  loop
                  autoPlay
                  muted
                  playsInline
                >
                  <source src="/images/vscode.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

interface ResourceListItemProps {
  links: {
    icon: "browse" | "github" | "figma" | "install" | "other";
    label: string;
    url: string;
  }[];
}

export const Links = ({ links }: ResourceListItemProps) => {
  return (
    <ul className={styles.Links}>
      {links.map((link) => (
        <li key={link.url}>
          <Link href={link.url}>
            <a data-icon={link.icon}>
              {link.icon === "browse" && <BrowseIcon />}

              {link.icon === "github" && <GitHubIcon />}

              {link.icon === "figma" && <FigmaIcon />}

              {link.icon === "install" && <InstallIcon />}

              {link.label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const Illustration = () => (
  <svg
    width={718 * 1.5}
    height={440 * 1.5}
    viewBox="0 0 718 440"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.Hero}
  >
    <g clipPath="url(#clip0_34_1756)">
      {/* <mask id="path-1-inside-1_34_1756" fill="white">
        <path d="M0 70H718V73H0V70Z" />
      </mask>
      <path
        d="M0 71H718V69H0V71Z"
        fill="rgba(0,0,0,.075)"
        mask="url(#path-1-inside-1_34_1756)"
      />
      <mask id="path-3-inside-2_34_1756" fill="white">
        <path d="M0 126H718V129H0V126Z" />
      </mask>
      <path
        d="M0 127H718V125H0V127Z"
        fill="rgba(0,0,0,.075)"
        mask="url(#path-3-inside-2_34_1756)"
      />
      <mask id="path-5-inside-3_34_1756" fill="white">
        <path d="M0 367H718V370H0V367Z" />
      </mask>
      <path
        d="M0 368H718V366H0V368Z"
        fill="rgba(0,0,0,.075)"
        mask="url(#path-5-inside-3_34_1756)"
      />
      <mask id="path-7-inside-4_34_1756" fill="white">
        <path d="M109 440L109 0L112 -7.67283e-08L112 440L109 440Z" />
      </mask>
      <path
        d="M110 440L110 -2.55758e-08L108 2.55758e-08L108 440L110 440Z"
        fill="rgba(0,0,0,.075)"
        mask="url(#path-7-inside-4_34_1756)"
      />
      <mask id="path-9-inside-5_34_1756" fill="white">
        <path d="M608 440L608 0L611 -7.67283e-08L611 440L608 440Z" />
      </mask>
      <path
        d="M609 440L609 -2.55758e-08L607 2.55758e-08L607 440L609 440Z"
        fill="rgba(0,0,0,.075)"
        mask="url(#path-9-inside-5_34_1756)"
      /> */}

      <rect
        x="110.5"
        y="71.5"
        width="497"
        height="297"
        rx="18.5"
        stroke="var(--text)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength="1"
      />
      <rect
        x="564.5"
        y="85.5"
        width="28"
        height="28"
        rx="14"
        stroke="var(--text)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength="1"
      />
      <rect
        x="253.5"
        y="85.5"
        width="109"
        height="28"
        rx="14"
        stroke="var(--text)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength="1"
      />
      <path
        d="M260 127.5H479C482.59 127.5 485.5 130.41 485.5 134V368.5H253.5V134C253.5 130.41 256.41 127.5 260 127.5Z"
        stroke="var(--text)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength="1"
      />
      <rect
        x="495.5"
        y="127.5"
        width="97"
        height="169"
        rx="6.5"
        stroke="var(--text)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength="1"
      />
      <line
        x1="235.5"
        y1="70"
        x2="235.5"
        y2="367"
        stroke="var(--text)"
        strokeWidth="3.5"
        pathLength="1"
      />
    </g>
    <defs>
      <clipPath id="clip0_34_1756">
        <rect width="718" height="440" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const Illustration2 = () => (
  <svg
    width="1188"
    height="809"
    viewBox="0 0 1188 809"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="1188" height="809" fill="white" />
    <path
      d="M157.04 196.7H157.081L157.122 196.698C158.729 196.61 160.271 196.034 161.542 195.045C162.807 194.062 163.743 192.716 164.225 191.189L200.025 86.9839C201.785 83.5227 204.532 81.5 207.6 81.5H220.4C224.151 81.5 226.882 83.5765 228.613 86.9804L263.774 191.185C264.297 192.842 265.353 194.282 266.777 195.279C268.196 196.272 269.901 196.771 271.63 196.7C272.919 196.708 274.153 197.223 275.065 198.135C275.984 199.054 276.5 200.3 276.5 201.6C276.5 202.9 275.984 204.146 275.065 205.065C274.146 205.984 272.9 206.5 271.6 206.5H226.8C225.5 206.5 224.254 205.984 223.335 205.065C222.416 204.146 221.9 202.9 221.9 201.6C221.9 200.3 222.416 199.054 223.335 198.135C224.254 197.216 225.5 196.7 226.8 196.7H226.859L226.919 196.695C228.036 196.607 229.122 196.281 230.104 195.741C231.085 195.2 231.941 194.457 232.613 193.56C233.286 192.663 233.76 191.634 234.004 190.54C234.248 189.446 234.256 188.313 234.029 187.215L234.013 187.137L233.988 187.061L228.228 169.141L227.893 168.1H226.8H182H180.869L180.558 169.188L175.438 187.108L175.423 187.161L175.411 187.215C175.184 188.313 175.192 189.446 175.436 190.54C175.68 191.634 176.154 192.663 176.827 193.56C177.499 194.457 178.355 195.2 179.337 195.741C180.318 196.281 181.404 196.607 182.521 196.695L182.581 196.7H182.64C183.94 196.7 185.186 197.216 186.105 198.135C187.024 199.054 187.54 200.3 187.54 201.6C187.54 202.9 187.024 204.146 186.105 205.065C185.186 205.984 183.94 206.5 182.64 206.5H157.04C155.74 206.5 154.494 205.984 153.575 205.065C152.656 204.146 152.14 202.9 152.14 201.6C152.14 200.3 152.656 199.054 153.575 198.135C154.494 197.216 155.74 196.7 157.04 196.7ZM205.816 107.024L204.4 102.987L202.985 107.024L185.705 156.304L185.005 158.3H187.12H221.68H223.796L223.096 156.304L205.816 107.024Z"
      stroke="black"
      strokeWidth="3"
    />
    <path
      d="M189.7 603.8V605.3H191.2H229.6C230.9 605.3 232.146 605.816 233.065 606.735C233.984 607.654 234.5 608.9 234.5 610.2C234.5 611.5 233.984 612.746 233.065 613.665C232.146 614.584 230.9 615.1 229.6 615.1H188C185.852 615.1 183.791 614.247 182.272 612.728C180.753 611.209 179.9 609.148 179.9 607V511C179.9 508.852 180.753 506.791 182.272 505.272C183.791 503.753 185.852 502.9 188 502.9H284C286.148 502.9 288.209 503.753 289.728 505.272C291.247 506.791 292.1 508.852 292.1 511V565.4C292.1 566.7 291.584 567.946 290.665 568.865C289.746 569.784 288.5 570.3 287.2 570.3C285.9 570.3 284.654 569.784 283.735 568.865C282.816 567.946 282.3 566.7 282.3 565.4V514.2V512.7H280.8H191.2H189.7V514.2V603.8ZM266.939 608.611L268 609.672L269.061 608.611L290.126 587.546C291.049 586.658 292.283 586.168 293.564 586.179C294.849 586.19 296.078 586.705 296.986 587.614C297.895 588.522 298.41 589.751 298.421 591.036C298.432 592.317 297.942 593.551 297.054 594.474L271.464 620.064L271.461 620.067C271.008 620.523 270.468 620.885 269.874 621.132C269.28 621.379 268.643 621.507 268 621.507C267.357 621.507 266.72 621.379 266.126 621.132C265.532 620.885 264.992 620.523 264.539 620.067L264.536 620.064L251.746 607.274C250.858 606.351 250.368 605.117 250.379 603.836C250.39 602.551 250.905 601.322 251.814 600.414C252.722 599.505 253.951 598.99 255.236 598.979C256.517 598.968 257.751 599.458 258.674 600.346L266.939 608.611ZM260.1 563.9H211.9V554.1H260.1V563.9ZM211.9 589.5V579.7H234.5V589.5H211.9ZM211.9 528.5H260.1V538.3H211.9V528.5Z"
      stroke="black"
      strokeWidth="3"
    />
    <path
      d="M634.8 692.168V755.4C634.798 757.895 635.769 760.292 637.507 762.082L634.8 692.168ZM634.8 692.168C634.792 689.805 635.664 687.524 637.245 685.768L634.8 692.168ZM667.33 653.632C668.855 652.14 670.905 651.303 673.04 651.303C675.184 651.303 677.241 652.146 678.768 653.649L708.049 686.447L708.052 686.45C709.385 687.935 710.117 689.853 710.106 691.84V691.848V755.4C710.106 757.553 709.249 759.61 707.724 761.135C706.194 762.655 704.125 763.507 701.969 763.506H701.968H644.144L667.33 653.632ZM667.33 653.632L667.372 653.582L666.23 652.61L667.287 653.674C667.302 653.66 667.316 653.646 667.33 653.632ZM634.467 638.506C636.568 638.506 638.594 639.349 640.107 640.844L648.654 650.566L626.245 675.943L626.245 675.943L626.236 675.954C622.411 680.366 620.3 686.006 620.289 691.845V691.848V750.7H605.919C604.865 750.699 603.823 750.488 602.851 750.082C601.879 749.675 600.998 749.08 600.258 748.33L600.256 748.329C598.747 746.804 597.9 744.745 597.9 742.6C597.9 742.6 597.9 742.6 597.9 742.6L597.9 679.368L597.9 679.361C597.891 677.373 598.616 675.451 599.935 673.963L599.94 673.958L599.944 673.953L622.21 648.36L622.216 648.353L628.836 640.842C629.571 640.106 630.444 639.522 631.404 639.121C632.376 638.715 633.42 638.506 634.474 638.506L634.474 637.006C636.993 637.008 639.41 638.026 641.2 639.816L634.467 638.506ZM680.92 689.654L680.92 689.654L676.733 672.93L677.304 671.543C677.303 671.542 677.303 671.542 677.302 671.542C675.269 670.705 673.033 670.486 670.876 670.913C668.719 671.341 666.735 672.395 665.174 673.945L665.171 673.947C664.008 675.107 663.117 676.511 662.563 678.057C662.009 679.604 661.805 681.254 661.966 682.889C662.128 684.523 662.65 686.102 663.497 687.51C664.343 688.918 665.491 690.12 666.859 691.03L667.236 691.281H667.26C669.32 692.53 671.732 693.082 674.137 692.847C676.699 692.596 679.094 691.468 680.92 689.654Z"
      stroke="black"
      strokeWidth="3"
    />
    <path
      d="M818.9 58.6V60.1H820.4H833.2C834.5 60.1 835.746 60.6162 836.665 61.5352C837.584 62.4541 838.1 63.7004 838.1 65C838.1 66.2996 837.584 67.5459 836.665 68.4648C835.746 69.3837 834.5 69.9 833.2 69.9H820.4H818.9V71.4V84.2C818.9 85.4995 818.384 86.7459 817.465 87.6648C816.546 88.5837 815.3 89.1 814 89.1C812.7 89.1 811.454 88.5837 810.535 87.6648C809.616 86.7459 809.1 85.4995 809.1 84.2V71.4V69.9H807.6H794.8C793.5 69.9 792.254 69.3837 791.335 68.4648C790.416 67.5459 789.9 66.2996 789.9 65C789.9 63.7004 790.416 62.4541 791.335 61.5352C792.254 60.6162 793.5 60.1 794.8 60.1H807.6H809.1V58.6V45.8C809.1 44.5004 809.616 43.2541 810.535 42.3352C811.454 41.4162 812.7 40.9 814 40.9C815.3 40.9 816.546 41.4162 817.465 42.3352C818.384 43.2541 818.9 44.5004 818.9 45.8V58.6ZM774.1 89.1H725.9V49C725.9 46.8517 726.753 44.7915 728.272 43.2724C729.792 41.7534 731.852 40.9 734 40.9H774.1V89.1ZM774.1 104.9V153.1H734C731.852 153.1 729.792 152.247 728.272 150.728C726.753 149.209 725.9 147.148 725.9 145V104.9H774.1ZM830 153.1H789.9V104.9H838.1V145C838.1 147.148 837.247 149.209 835.728 150.728C834.209 152.247 832.148 153.1 830 153.1Z"
      stroke="black"
      strokeWidth="3"
    />
    <path
      d="M1031.97 378.648L1031.41 380.041C1030.52 379.684 1029.54 379.597 1028.61 379.79C1027.67 379.982 1026.8 380.447 1026.12 381.125C1025.45 381.803 1024.98 382.665 1024.79 383.605C1024.6 384.545 1024.68 385.52 1025.04 386.411L1025.04 386.411L1050.64 450.411L1050.64 450.414C1050.99 451.296 1051.59 452.056 1052.36 452.604C1053.13 453.147 1054.04 453.458 1054.98 453.5H1055.2H1055.21C1056.12 453.506 1057.02 453.257 1057.8 452.781C1058.58 452.306 1059.21 451.622 1059.62 450.808C1059.62 450.807 1059.62 450.806 1059.62 450.805L1071.46 427.129L1071.68 426.684L1072.13 426.46L1095.8 414.558C1095.8 414.558 1095.8 414.557 1095.8 414.557C1096.64 414.131 1097.34 413.472 1097.82 412.66C1098.29 411.847 1098.52 410.914 1098.48 409.973C1098.44 409.032 1098.13 408.123 1097.58 407.354C1097.04 406.586 1096.28 405.991 1095.41 405.641L1031.97 378.648ZM1031.97 378.648L1031.41 380.041L1095.41 405.64L1031.97 378.648ZM1071.46 342.736C1071.46 342.736 1071.46 342.736 1071.46 342.736C1072.38 343.655 1072.9 344.901 1072.9 346.2C1072.9 347.499 1072.38 348.745 1071.46 349.664C1071.46 349.664 1071.46 349.664 1071.46 349.664L1058.67 362.454C1057.75 363.342 1056.52 363.832 1055.24 363.821C1053.95 363.81 1052.72 363.295 1051.81 362.386C1050.91 361.478 1050.39 360.249 1050.38 358.964C1050.37 357.683 1050.86 356.449 1051.75 355.526L1064.54 342.736C1064.54 342.736 1064.54 342.736 1064.54 342.736C1065.45 341.817 1066.7 341.301 1068 341.301C1069.3 341.301 1070.55 341.817 1071.46 342.736C1071.46 342.736 1071.46 342.736 1071.46 342.736ZM987.746 419.526L1000.53 406.746C1001.45 405.858 1002.68 405.368 1003.96 405.379C1005.25 405.39 1006.48 405.905 1007.39 406.814C1008.29 407.722 1008.81 408.951 1008.82 410.236C1008.83 411.517 1008.34 412.751 1007.45 413.674L994.674 426.454C993.751 427.342 992.517 427.832 991.236 427.821C989.951 427.81 988.722 427.295 987.814 426.386C986.905 425.478 986.39 424.249 986.379 422.964C986.368 421.683 986.858 420.449 987.746 419.526ZM1033.06 356.064C1032.38 356.749 1031.51 357.216 1030.56 357.405C1029.61 357.594 1028.62 357.496 1027.72 357.126C1026.83 356.755 1026.06 356.127 1025.53 355.321C1024.99 354.516 1024.7 353.569 1024.7 352.6C1024.7 352.6 1024.7 352.6 1024.7 352.6V333.4C1024.7 332.1 1025.22 330.854 1026.14 329.935C1027.05 329.016 1028.3 328.5 1029.6 328.5C1030.9 328.5 1032.15 329.016 1033.06 329.935C1033.98 330.854 1034.5 332.1 1034.5 333.4V352.6C1034.5 352.6 1034.5 352.6 1034.5 352.6C1034.5 353.899 1033.98 355.145 1033.06 356.064ZM1001.06 381.136C1001.75 381.821 1002.22 382.694 1002.4 383.644C1002.59 384.595 1002.5 385.58 1002.13 386.475C1001.75 387.37 1001.13 388.135 1000.32 388.674C999.516 389.212 998.569 389.5 997.6 389.5C997.6 389.5 997.6 389.5 997.6 389.5H978.4C977.1 389.5 975.854 388.984 974.935 388.065C974.016 387.146 973.5 385.9 973.5 384.6C973.5 383.3 974.016 382.054 974.935 381.135C975.854 380.216 977.1 379.7 978.4 379.7H997.6C997.6 379.7 997.6 379.7 997.6 379.7C998.899 379.7 1000.15 380.217 1001.06 381.136ZM991.236 341.379C992.517 341.368 993.751 341.858 994.674 342.746L1007.45 355.526C1008.34 356.449 1008.83 357.683 1008.82 358.964C1008.81 360.249 1008.29 361.478 1007.39 362.386C1006.48 363.295 1005.25 363.81 1003.96 363.821C1002.68 363.832 1001.45 363.342 1000.53 362.454L987.746 349.674C986.858 348.751 986.368 347.517 986.379 346.236C986.39 344.951 986.905 343.722 987.814 342.814C988.722 341.905 989.951 341.39 991.236 341.379Z"
      stroke="black"
      strokeWidth="3"
    />
  </svg>
);

export default ResourcesPage;
