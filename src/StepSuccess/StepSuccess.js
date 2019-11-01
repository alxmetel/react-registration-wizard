import React from 'react';
import style from './StepSuccess.less';

const StepSuccess = props => {
  return (
    <div className={style.successPage}>
      <div className={style.messageBlock}>
        <div className={style.checkMark}><i class="fa fa-check" aria-hidden="true"></i></div>
        <div className={style.message}>
          {props.localize('successMessage')}
        </div>
        <a className={style.homePageBtn} href="/catalog">{props.localize('homeBtn')}</a>
      </div>  
    </div>
  );
}

export default StepSuccess;