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
        <div className={styles.Grid}>
          {analysis.map((component) => (
            <div key={component.name}>
              <h2>{component.name}</h2>
              <ul>
                <li>Is documented: {component.isDocumented ? '✅' : '❌'}</li>
                <li>
                  Types contain any: {component.typesContainAny ? '💩' : '—'}
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
      </div>
    </Page>
  );
}

export default AnalysisPage;
