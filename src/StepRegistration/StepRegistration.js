import React from 'react';
import style from './StepRegistration.less';
import Steps from '../Steps/Steps';
import TabRegistration from './TabRegistration/TabRegistration';
import TabAuthorization from './TabAuthorization/TabAuthorization';

const StepRegistration = props => {

  const setHasLigaID = bool => {
    props.setHasLigaID(bool);
  }

  const showTab = () => {

    let tabView = '';

    if (props.hasLigaID) {
      tabView =
        <TabAuthorization
          localize = {props.localize}
          inputChangeHandler = {props.inputChangeHandler}
          inputFocusHandler = {props.inputFocusHandler}
          inputData = {props.inputData}
          formAuthorizationIsValid = {props.formAuthorizationIsValid}
          handleStepSubmit = {props.handleStepSubmit}
          useCurrentLigaId = {props.useCurrentLigaId}
          currLigaIdUsed = {props.currLigaIdUsed}
        />
    } else {
      tabView =
        <TabRegistration
          localize = {props.localize}
          inputChangeHandler = {props.inputChangeHandler}
          inputFocusHandler = {props.inputFocusHandler}
          inputData = {props.inputData}
          formRegistrationIsValid = {props.formRegistrationIsValid}
          handleStepSubmit = {props.handleStepSubmit}
        />
    }
    return tabView;
  }
  
  return (
    <div className={style.container}>

      <Steps
        localize = {props.localize}
        handleStepSubmit = {props.handleStepSubmit}
        activeStep={props.activeStep}
      />

      <div className={style.tabsBlock}>
        <div
          className={`${style.tabItem} ${!props.hasLigaID ? style.active : ""}`}
          onClick={() => setHasLigaID(false)}
        >
          <span>{props.localize('tabRegistration')}</span>
        </div>
        <div
          className={`${style.tabItem} ${props.hasLigaID ? style.active : ""}`}
          onClick={() => setHasLigaID(true)}
        >
          <span>{props.localize('tabAuthorization')}</span>
        </div>
      </div>

      {showTab()}
    </div>
  );
}

export default StepRegistration;