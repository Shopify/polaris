import * as React from 'react';

import {classNames} from '@shopify/react-utilities/styles';
import {autobind, memoize} from '@shopify/javascript-utilities/decorators';

import {Avatar, AvatarProps, Icon, UnstyledLink} from '../../../../components';
import {IconableAction} from '../../../../types';
import MessageIndicator from '../../../MessageIndicator';
import Message, {Props as MessageProps} from '../Message';
import * as styles from './UserMenu.scss';

interface UserActionSection {
  id: string;
  items: IconableAction[];
}

export interface Props {
  name?: string;
  detail?: string;
  actions?: UserActionSection[];
  message?: MessageProps;
  avatarInitials: AvatarProps['initials'];
  avatarSource?: AvatarProps['source'];
}

interface State {
  userMenuExpanded?: boolean;
}

export default class UserMenu extends React.PureComponent<Props, State> {
  state: State = {
    userMenuExpanded: false,
  };

  render() {
    const {
      name,
      detail,
      avatarInitials,
      avatarSource,
      actions,
      message,
    } = this.props;
    const {userMenuExpanded} = this.state;

    const className = classNames(
      styles.UserMenu,
      userMenuExpanded && styles.expanded,
    );

    const itemClassName = styles.Item;
    const tabIndex = userMenuExpanded ? 0 : -1;

    const itemsMarkup =
      actions &&
      actions.map((section) => {
        return (
          <div className={styles.Section} key={section.id}>
            {section.items.map((item) => {
              const icon = item.icon;
              return item.url ? (
                <UnstyledLink
                  url={item.url}
                  key={item.content}
                  className={itemClassName}
                  tabIndex={tabIndex}
                  onClick={this.handleClick}
                >
                  {icon && (
                    <span className={styles.Icon}>
                      <Icon source={icon} />
                    </span>
                  )}
                  {item.content}
                </UnstyledLink>
              ) : (
                <button
                  type="button"
                  key={item.content}
                  onClick={
                    item.onAction
                      ? this.createActionHandler(item.onAction)
                      : this.handleClick
                  }
                  className={itemClassName}
                  tabIndex={tabIndex}
                >
                  {item.icon && (
                    <span className={styles.Icon}>
                      <Icon source={item.icon} />
                    </span>
                  )}
                  {item.content}
                </button>
              );
            })}
          </div>
        );
      });

    const badgeProps = message &&
      message.badge && {
        content: message.badge.content,
        status: message.badge.status,
      };
    const messageMarkup = message && (
      <Message
        title={message.title}
        description={message.description}
        action={{
          onClick: message.action.onClick,
          content: message.action.content,
        }}
        link={{to: message.link.to, content: message.link.content}}
        badge={badgeProps}
      />
    );

    const showIndicator = Boolean(message);

    return (
      <div className={className}>
        <button
          type="button"
          className={styles.Button}
          onClick={this.handleClick}
          onMouseUp={handleMouseUp}
        >
          <span className={styles.Avatar}>
            <MessageIndicator active={showIndicator}>
              <Avatar
                size="small"
                source={avatarSource}
                initials={avatarInitials && avatarInitials.replace(' ', '')}
              />
            </MessageIndicator>
          </span>
          <span className={styles.Details}>
            <span className={styles.Name}>{name}</span>
            <span className={styles.Detail}>{detail}</span>
          </span>
          <span className={styles.DisclosureIcon}>
            <Icon
              source="chevronDown"
              color="inkLightest"
              accessibilityLabel="Show user menu"
            />
          </span>
        </button>
        <div className={styles.List} aria-hidden={!userMenuExpanded}>
          {itemsMarkup}
          {messageMarkup}
        </div>
      </div>
    );
  }

  @memoize()
  private createActionHandler(handler: () => void) {
    return () => {
      handler();
      this.handleClick();
    };
  }

  @autobind
  private handleClick() {
    this.setState(({userMenuExpanded}) => ({
      userMenuExpanded: !userMenuExpanded,
    }));
  }
}

function handleMouseUp({currentTarget}: React.MouseEvent<HTMLButtonElement>) {
  currentTarget.blur();
}
