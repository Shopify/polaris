import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Icon from '../Icon';
import {CaretDownIcon} from '@shopify/polaris-icons';

export interface CollasibleDetailsProps {
  summary?: string | React.ReactNode;
}
export function CollapsibleDetails({
  children,
  summary,
}: React.PropsWithChildren<CollasibleDetailsProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <details>
      <motion.summary
        style={{display: 'flex', margin: '0.5rem 0', cursor: 'pointer'}}
        onClick={toggleOpen}
        initial={false}
      >
        <motion.span
          style={{display: 'flex', maxHeight: '20px'}}
          initial={{rotate: -90}}
          animate={{rotate: isOpen ? 0 : -90}}
          exit={{rotate: -90}}
          transition={{ease: 'easeInOut', duration: 0.15}}
        >
          <Icon source={CaretDownIcon} />
        </motion.span>
        {summary}
      </motion.summary>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, scale: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{ease: 'easeInOut', duration: 0.15}}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </details>
  );
}
