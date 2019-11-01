import React from 'react';
import style from './TabAuthorization.less';

import TextInput from '../../Form/TextInput';
import Checkbox from '../../Form/Checkbox';

const TabAuthorization = props => {
  const section = 'stepRegistration-authorization';

  let ligaIdBtn = null;

  const useLigaIdBtn = (
    <div
      className={style.useLigaIdBtn}
      data-stat="jurliga-catalog-registryform_next_step2-current_id-button-2"
      onClick={() => {
        props.useCurrentLigaId();

        // For web stat
        let chosenEventAction = '';
        if (props.inputData.dataStepInformation.dataIndividual.individualLastName.value !== "") {
          chosenEventAction = `jurliga-catalog-registryform_se-next_step2-current_id-button-2-${props.inputData.dataStepInformation.dataIndividual.individualType.value}-${props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value}`;
        } else if (props.inputData.dataStepInformation.dataEntity.companyName.value !== "") {
          chosenEventAction = `jurliga-catalog-registryform_ce-next_step2-current_id-button-2-${props.inputData.dataStepInformation.dataEntity.companyType.value}-${props.inputData.dataStepInformation.dataEntity.companyEmployeesNum.value}-${props.inputData.dataStepInformation.dataEntity.companyAddressRegion.value}`;
        }

        dataLayer.push({
          'event': 'CatalogEvent',
          'eventCategory': 'jurCatalog-register',
          'eventAction': chosenEventAction,
          'eventLabel': window.location.href
        });
      }}
    >
      <span>{props.localize('useCurrentLigaIdBtn')}</span>
    </div>
  );

  const ligaIdUsedBtn = (
    <div className={style.currLigaIdUsed}>
      <div>
        <div className={style.checkmark}></div>
      </div>
      <div>{props.localize('currentLigaIdIsUsed')}</div>
    </div>
  );

  ligaIdBtn = props.currLigaIdUsed ? ligaIdUsedBtn : useLigaIdBtn;

  return (
    <form className={`${style.TabAuthorization} ${style.form}`}>
      <div className={style.contentBlock}>

        <div className={style.leftColumn}>
          <div className={style.row}>

            <TextInput
              type="email"
              name="authorizationEmail"
              data-stat="jurliga-catalog-registryform_email_id-input-2"
              placeholderText={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationEmail.placeholderText}
              onFocus={e => props.inputFocusHandler(e, true, section)}
              onBlur={e => props.inputFocusHandler(e, false, section)}
              focused={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationEmail.focused}
              value={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationEmail.value}
              onChange={e => props.inputChangeHandler(e, section)}
              touched={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationEmail.touched}
              valid={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationEmail.valid}
              errMsg={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationEmail.errorMessage}
            />

            <TextInput
              type="password"
              name="authorizationPassword"
              data-stat="jurliga-catalog-registryform_password_id-input-2"
              placeholderText={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationPassword.placeholderText}
              onFocus={e => props.inputFocusHandler(e, true, section)}
              onBlur={e => props.inputFocusHandler(e, false, section)}
              focused={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationPassword.focused}
              value={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationPassword.value}
              onChange={e => props.inputChangeHandler(e, section)}
              touched={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationPassword.touched}
              valid={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationPassword.valid}
              errMsg={props.inputData.dataStepRegistration.dataTabAuthorization.authorizationPassword.errorMessage}
            />
          </div>
          <div className={style.agreementsBlock}>

            <Checkbox
              name="agreementCheck1"
              value={props.inputData.dataStepRegistration.dataTabAuthorization.agreementCheck1.value}
              onChange={e => props.inputChangeHandler(e, section)}
              inputData={props.inputData}
              labelText={<span>{props.localize('formAgreement1-1')} <a target="_blank" href="http://support1.ligazakon.ua/politika-konfidencijnosti-ta-obrobki-personalnix-danix?_ga=2.110428994.678135854.1558007503-292395073.1558007503">{props.localize('formAgreement1-2')}</a> {props.localize('formAgreement1-3')}</span>}
              touched={props.inputData.dataStepRegistration.dataTabAuthorization.agreementCheck1.touched}
              valid={props.inputData.dataStepRegistration.dataTabAuthorization.agreementCheck1.valid}
            />

            <Checkbox
              name="agreementCheck2"
              value={props.inputData.dataStepRegistration.dataTabAuthorization.agreementCheck2.value}
              onChange={e => props.inputChangeHandler(e, section)}
              inputData={props.inputData}
              labelText={<span>{props.localize('formAgreement2-1')} <a target="_blank" href="http://jurliga.ligazakon.ua/page/agreement.htm">{props.localize('formAgreement2-2')}</a> {props.localize('formAgreement2-3')} <a target="_blank" href="http://jurliga.ligazakon.ua/page/specification.htm">{props.localize('formAgreement2-4')}</a></span>}
              touched={props.inputData.dataStepRegistration.dataTabAuthorization.agreementCheck2.touched}
              valid={props.inputData.dataStepRegistration.dataTabAuthorization.agreementCheck2.valid}
            />
          </div>
        </div>

        <div className={style.rightColumn}>
          {ligaIdBtn}
        </div>
      </div>

      <input
        className={`${style.submitBtn} ${!props.formAuthorizationIsValid ? style.nonActive : ''}`}
        data-stat="jurliga-catalog-registryform_next_step2-by_id-button-2"
        type="submit"
        value={props.localize('registerBtn')}
        onClick={e => props.handleStepSubmit(e, 3)}
      />
    </form>
  );
}

export default TabAuthorization;