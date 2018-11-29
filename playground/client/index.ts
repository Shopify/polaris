import App from '../app/App';
import renderApp from './render-app';

const appContainer: HTMLElement | null = document.getElementById('app');

renderApp(appContainer, App);

if ((module as any).hot) {
  (module as any).hot.accept('./index.ts');
  (module as any).hot.accept('../app/App.tsx', () =>
    renderApp(appContainer, App),
  );
}
