import React from 'react';
import style from './Steps.less';

const Steps = props => {

  return (
    <div className={style.Steps}>
      <h2 className={style.stepsBlockTitle}>{props.localize('stepsMainTitle')}</h2>
      <div className={style.stepsSection}>
        <div
          className={`${style.stepBlock} ${props.activeStep === 1 ? style.active : ""}`}
          onClick={(e) => props.handleStepSubmit(e, 1)}
        >
          <div className={style.stepNumber}>1</div>
          <div className={style.stepName}>{props.localize('stepTitleInformation')}</div>
        </div>
        <div className={style.stepDivider}></div>
        <div
          className={`${style.stepBlock} ${props.activeStep === 2 ? style.active : ""}`}
          onClick={e => props.handleStepSubmit(e, 2)}
        >
          <div className={style.stepNumber}>2</div>
          <div className={style.stepName}>{props.localize('stepTitleRegistration')}</div>
        </div>
      </div>
    </div>
  );
}

export default Steps;