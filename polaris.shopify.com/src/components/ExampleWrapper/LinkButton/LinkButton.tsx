import styles from './LinkButton.module.scss';
type Props = React.ComponentProps<'button'>;

const LinkButton: React.ComponentType<Props> = (props) => {
  return <button {...props} className={styles.Link} />;
};

export default LinkButton;
