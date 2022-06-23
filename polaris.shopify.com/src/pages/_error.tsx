import { NextPageContext } from "next";
import ErrorPage from "../components/ErrorPage";

interface Props {
  statusCode?: number;
}

function Error({ statusCode }: Props) {
  return <ErrorPage statusCode={statusCode} />;
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
