import {BrowserRouter, Link as ReactRouterLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppProvider linkComponent={Link}>
        {/* App content including your <Route> components */}
      </AppProvider>
    </BrowserRouter>
  );
}

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

function Link({children, url = '', external, ref, ...rest}) {
  // react-router only supports links to pages it can handle itself. It does not
  // support arbirary links, so anything that is not a path-based link should
  // use a reglar old `a` tag
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    rest.target = '_blank';
    rest.rel = 'noopener noreferrer';
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
}

    export default App;