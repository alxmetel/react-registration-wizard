import React from 'react';
import style from './NonVisibleView.less';

const NonVisibleView = (props) => {
  return (
    <div className={style.nonVisiblePage}>
      <div className={style.messageBlock}>
        <div className={style.checkMark}><i class="fa fa-exclamation" aria-hidden="true"></i></div>
        <div className={style.message}>
          {props.localize('nonViziblePageMsg')}
        </div>
        <a className={style.homePageBtn} href="/catalog">{props.localize('homeBtn')}</a>
      </div> 
    </div>
  );
}

export default NonVisibleView;