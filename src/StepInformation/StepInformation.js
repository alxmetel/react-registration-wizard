import React from 'react';
import style from './StepInformation.less';
import Steps from '../Steps/Steps';
import Entity from './Entity/Entity';
import Individual from './Individual/Individual';

const StepInformation = props => {

  const switchTabs = tabId => {
    props.setFirmType(tabId)
  }

  const showTab = () => {

    let tabView = '';

    if (props.activeFirmType === 0) {
      tabView =
        <Individual
          localize = {props.localize}
          inputChangeHandler = {props.inputChangeHandler}
          inputFocusHandler = {props.inputFocusHandler}
          addImageData = {props.addImageData}
          inputData = {props.inputData}
          formIndividualIsValid = {props.formIndividualIsValid}
          handleStepSubmit = {props.handleStepSubmit}
          setDistrictFieldValidity = {props.setDistrictFieldValidity}
        />
    } else if (props.activeFirmType === 1) {
      tabView =
        <Entity
          localize = {props.localize}
          inputChangeHandler = {props.inputChangeHandler}
          inputFocusHandler = {props.inputFocusHandler}
          addImageData = {props.addImageData}
          inputData = {props.inputData}
          formEntityIsValid = {props.formEntityIsValid}
          handleStepSubmit = {props.handleStepSubmit}
          setDistrictFieldValidity = {props.setDistrictFieldValidity}
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
          className={`${style.tabItem} ${props.activeFirmType === 0 ? style.active : ""}`}
          onClick={() => switchTabs(0)}
        >
          <span>{props.localize('tabTitleIndividual')}</span>
        </div>

        <div
          className={`${style.tabItem} ${props.activeFirmType === 1 ? style.active : ""}`}
          onClick={() => switchTabs(1)}
        >
          <span>{props.localize('tabTitleEntity')}</span>
        </div>
      </div>

      {showTab()}
    </div>
  );
}

export default StepInformation;