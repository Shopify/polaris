import styles from './AnalysisPage.module.scss';
import untypedAnalysis from '../../../.cache/analysis.json';
import * as polaris from '@shopify/polaris';
import Page from '../Page';

interface Analysis {
  name: string;
  isDocumented: boolean;
  propsFollowNamingConvention: boolean;
  typesContainAny: boolean;
}

const analysis = untypedAnalysis as Analysis[];

interface Props {}

function AnalysisPage({}: Props) {
  return (
    <Page>
      <div className={styles.AnalysisPage}>
        <h1>Analysis</h1>

        <h2>Components</h2>
        <div className={styles.Grid}>
          {analysis.map((component) => (
            <div key={component.name}>
              <h3>{component.name}</h3>
              <ul>
                <li>Is documented: {component.isDocumented ? '✅' : '❌'}</li>
                <li>
                  Types do not use any:{' '}
                  {component.typesContainAny ? '❌' : '✅'}
                </li>
                <li>
                  Props follow naming convention:{' '}
                  {component.propsFollowNamingConvention ? '✅' : '❌'}
                </li>
                <li>
                  Is exported from Polaris:{' '}
                  {polaris[component.name] ? '✅' : '❌'}
                </li>
              </ul>
            </div>
          ))}
        </div>

        <h2>Exports</h2>
        <div className={styles.Grid}>
          {Object.keys(polaris)
            .sort((a, b) => a.localeCompare(b))
            .map((key) => (
              <div key={key}>
                <h3>
                  {analysis.find((component) => component.name === key)
                    ? '✅'
                    : key.startsWith('use')
                    ? '👀'
                    : '❌'}{' '}
                  {key} ({typeof polaris[key]})
                </h3>
              </div>
            ))}
        </div>
      </div>
    </Page>
  );
}

export default AnalysisPage;
