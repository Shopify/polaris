import {
  Page,
  Badge,
  LegacyCard,
  TextField,
  Button,
  ButtonGroup,
  Popover,
  Frame,
  ContextualSaveBar,
  FormLayout,
  ActionList,
} from '@shopify/polaris';
import React, {useState, useRef} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
import {ChevronDownIcon} from '@shopify/polaris-icons';

function PageExample() {
  interface FormState {
    title: string;
    description: string;
    isDraft: boolean;
  }

  const initialState: FormState = {
    title: 'Jar With Lock-Lid',
    description: '',
    isDraft: false,
  };

  const [active, setActive] = React.useState(false);
  const [title, setTitle] = useState('Jar With Lock-Lid');
  const [description, setDescription] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const savedEditHistory = useRef<
    {
      title: string;
      description: string;
      isDraft: boolean;
    }[]
  >([]);

  const handleChange = (name: string) => (value: string) => {
    switch (name) {
      case 'title':
        handleDirtyState(name, value, title);
        setTitle(value);
        break;
      case 'description':
        handleDirtyState(name, value, description);
        setDescription(value);
        break;
      default:
        null;
    }
  };

  const handleDirtyState = (
    name: keyof FormState,
    newValue: string,
    currentValue: string,
  ) => {
    if (
      (newValue !== initialState[name] && !isDirty) ||
      newValue !== currentValue
    ) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  };

  const handleDiscard = () => {
    const previousState: {
      title: string;
      description: string;
      isDraft: boolean;
    } = savedEditHistory.current.pop() ?? initialState;

    setTitle(previousState?.title);
    setDescription(previousState?.description);
    setIsDraft(previousState?.isDraft);
    setIsDirty(false);
  };

  const splitButton = (
    <ButtonGroup variant="segmented">
      <Button
        size="large"
        onClick={() => {
          savedEditHistory.current.push({title, description, isDraft: false});
          setIsDirty(false);
          setIsDraft(false);
        }}
      >
        Save
      </Button>

      <Popover
        active={active}
        preferredAlignment="right"
        activator={
          <Button
            size="large"
            onClick={() => setActive(true)}
            icon={ChevronDownIcon}
            accessibilityLabel="Other save actions"
          />
        }
        autofocusTarget="first-node"
        onClose={() => setActive(false)}
        zIndexOverride={514}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              content: 'Save as draft',
              onAction: () => {
                setIsDraft(true);
                savedEditHistory.current.push({
                  title,
                  description,
                  isDraft: true,
                });
              },
            },
          ]}
          onActionAnyItem={() => setIsDirty(false)}
        />
      </Popover>
    </ButtonGroup>
  );

  const saveBar = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={splitButton}
      discardAction={{
        content: 'Discard',
        onAction: handleDiscard,
      }}
    />
  ) : null;

  console.log(savedEditHistory);

  return (
    <Frame
      logo={{
        width: 124,
        contextualSaveBarSource:
          'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
      }}
    >
      {saveBar}
      <Page
        backAction={{content: 'Products', url: '#'}}
        title="Jar With Lock-Lid"
        titleMetadata={
          <Badge tone={isDraft ? 'info' : 'success'}>
            {isDraft ? 'Draft' : 'Active'}
          </Badge>
        }
        secondaryActions={[
          {content: 'Duplicate'},
          {content: 'View on your store'},
        ]}
        pagination={{
          hasPrevious: true,
          hasNext: true,
        }}
      >
        <LegacyCard sectioned>
          <FormLayout>
            <TextField
              autoComplete="off"
              label="Title"
              value={title}
              onChange={handleChange('title')}
            />
            <TextField
              multiline
              autoComplete="off"
              label="Description"
              value={description}
              onChange={handleChange('description')}
            />
          </FormLayout>
        </LegacyCard>
      </Page>
    </Frame>
  );
}

export default withPolarisExample(PageExample);
