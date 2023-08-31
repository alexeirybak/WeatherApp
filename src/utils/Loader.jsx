import React from 'react';
import styles from './loader.module.css';

export function Loader() {
  return (
    <div className={styles.loc_loader}>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
