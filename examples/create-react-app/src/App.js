import React, {Component} from 'react';
import {
  Layout,
  Page,
  FooterHelp,
  Card,
  Link,
  Button,
  FormLayout,
  TextField,
  AccountConnection,
  ChoiceList,
  FeatureAction,
} from '@shopify/quilt';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      email: '',
      checkboxes: [],
      connected: false,
    };
  }

  render() {
    const breadcrumbs = [
      {content: 'Sample apps'},
      {content: 'Create React App'},
    ];
    const primaryAction = {content: 'New product'};
    const secondaryActions = [{content: 'Import'}];

    const featureAction = (
      <Button
        children="Customize Checkout"
        primary
      />
    );

    const choiceListItems = [
      {label: 'I accept the Terms of Service', value: 'false'},
      {label: 'I consent to receiving emails', value: 'false2'},
    ];

    return (
      <Page
        title="Polaris"
        breadcrumbs={breadcrumbs}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
      >
        <Layout>
          <Layout.AnnotatedSection
            title="Style"
            description="Customize the style of your checkout"
          >
            <Card sectioned>
              <FeatureAction
                action={featureAction}
              >
                Upload your store’s logo, change colors and fonts, and more.
              </FeatureAction>
            </Card>
          </Layout.AnnotatedSection>

         {this.renderAccount()}

          <Layout.AnnotatedSection
            title="Form"
            description="A sample form using Polaris components."
          >
            <Card sectioned>
              <FormLayout>
                <FormLayout.Group>
                  <TextField
                    value={this.state.first}
                    label="First Name"
                    placeholder="Tom"
                    onChange={this.valueUpdater('first')}
                  />
                  <TextField
                    value={this.state.last}
                    label="Last Name"
                    placeholder="Ford"
                    onChange={this.valueUpdater('last')}
                  />
                </FormLayout.Group>

                <TextField
                  value={this.state.email}
                  label="Email"
                  placeholder="example@email.com"
                  onChange={this.valueUpdater('email')}
                />

                <TextField
                  autoGrow
                  label="How did you hear about us?"
                  placeholder="Website, ads, email, etc."
                  value={this.state.autoGrow}
                  onChange={this.valueUpdater('autoGrow')}
                />

                <ChoiceList
                  allowMultiple
                  choices={choiceListItems}
                  selected={this.state.checkboxes}
                  onChange={this.valueUpdater('checkboxes')}
                />

                <Button primary>Submit</Button>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>

          <Layout.Section>
            <FooterHelp>For more details on Polaris, visit our <Link url="https://shopify.github.io/channels-ui-kit/latest/assets.html">styleguide</Link>.</FooterHelp>
          </Layout.Section>

        </Layout>
      </Page>
    );
  }

  valueUpdater(field) {
    return (value) => this.setState({[field]: value});
  }
  toggleConnection() {
    this.setState(({connected}) => ({connected: !connected}));
  }

  connectAccountMarkup() {
    return (
      <Layout.AnnotatedSection
        title="Account"
        description="Connect your account to your Shopify store."
      >
        <AccountConnection
          action={{
            content: 'Connect',
            onAction: this.toggleConnection.bind(this, this.state),
          }}
          details="No account connected"
          termsOfService={<p>By clicking Connect, you are accepting Sample’s <Link url="https://shopify.github.io/channels-ui-kit/latest/assets.html#">Terms and Conditions</Link>, including a commission rate of 15% on sales.</p>}
        />
      </Layout.AnnotatedSection>
    );
  }

  disconnectAccountMarkup() {
    return (
      <Layout.AnnotatedSection
          title="Account"
          description="Disconnect your account from your Shopify store."
        >
        <AccountConnection
          connected
          action={{
            content: 'Disconnect',
            onAction: this.toggleConnection.bind(this, this.state),
          }}
          accountName="Tom Ford"
          title={<Link url="http://google.com">Tom Ford</Link>}
          details="Account id: d587647ae4"
        />
      </Layout.AnnotatedSection>
    );
  }

  renderAccount() {
    return this.state.connected
      ? this.disconnectAccountMarkup()
      : this.connectAccountMarkup();
  }
}

export default App;
