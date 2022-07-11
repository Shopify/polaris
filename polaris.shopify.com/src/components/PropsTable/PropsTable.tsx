import { PropsForComponent } from "../../types";
import StatusBadge from "../StatusBadge";
import styles from "./PropsTable.module.scss";

interface Props {
  props: PropsForComponent;
}

function PropsTable({ props: { interfaceName, props } }: Props) {
  const feedbackTitle = "[polaris.shopify.com] Props table feedback";
  const feedbackUrl = `https://github.com/shopify/polaris/issues/new?title=${encodeURIComponent(
    feedbackTitle
  )}&amp;labels=polaris.shopify.com`;

  return (
    <div className={styles.PropsTable}>
      <h2 id="properties">Props</h2>
      <p>
        This feature is a work in progress. Please{" "}
        <a href={feedbackUrl}>share your feedback</a>.
      </p>

      {props.length > 0 ? (
        <table>
          <tbody>
            {props
              .sort((a, b) => (a.optional ? 1 : -1))
              .map((prop) => (
                <>
                  <tr key={prop.name}>
                    <td>
                      {prop.name}
                      {prop.optional ? "?" : ""}
                      {prop.deprecated ? (
                        <>
                          {" "}
                          <StatusBadge
                            status={{
                              value: "Deprecated",
                              message: "Deprecated",
                            }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                      <br />
                    </td>
                    <td>{prop.type}</td>
                  </tr>
                  <tr>
                    <td className={styles.Comment} colSpan={2}>
                      {prop.comment}
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      ) : (
        <p>This component does not accept any props.</p>
      )}
    </div>
  );
}

export default PropsTable;
