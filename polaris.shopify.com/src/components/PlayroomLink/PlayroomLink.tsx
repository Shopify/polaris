import {createUrl} from 'playroom';
import {playroom} from '../../../constants';
import styles from './PlayroomLink.module.scss';

const getAppCode = (code: string) => {
  const codeLines = code.trim().split('\n');
  let lineWithFunctionName = codeLines.findIndex((name) =>
    name.match(/function .*Example/g),
  );
  let lineWithFunctionClosed;

  if (lineWithFunctionName === -1) {
    lineWithFunctionName = 0;
  } else {
    lineWithFunctionClosed = -1;
  }

  return codeLines
    .slice(lineWithFunctionName + 1, lineWithFunctionClosed)
    .join('\n')
    .trim();
};

interface Props {
  code: string;
}

const PlayroomButton = (props: Props) => {
  const {code} = props;

  const encodedCode = createUrl({
    baseUrl: playroom.baseUrl,
    code: getAppCode(code), //encodeURL(getAppCode(code));
    themes: ['locale:en'],
    paramType: 'search',
  });

  return (
    <a
      href={encodedCode}
      className={styles.Link}
      target="_blank"
      rel="noreferrer"
    >
      Open in Playroom
    </a>
  );
};

export default PlayroomButton;
