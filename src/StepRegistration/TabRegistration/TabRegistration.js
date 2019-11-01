import React from 'react';
import style from './TabRegistration.less';

import TextInput from '../../Form/TextInput';
import Checkbox from '../../Form/Checkbox';

const TabRegistration = props => {
  const section = 'stepRegistration-registration';
  return (
    <form className={`${style.TabRegistration} ${style.form}`}>
      <div className={style.contentBlock}>
        <div className={style.row}>

          <TextInput
            type="email"
            name="registrationEmail"
            data-stat="jurliga-catalog-registryform_email_wo_id-input-2"
            placeholderText={props.inputData.dataStepRegistration.dataTabRegistration.registrationEmail.placeholderText}
            onFocus={e => props.inputFocusHandler(e, true, section)}
            onBlur={e => props.inputFocusHandler(e, false, section)}
            focused={props.inputData.dataStepRegistration.dataTabRegistration.registrationEmail.focused}
            value={props.inputData.dataStepRegistration.dataTabRegistration.registrationEmail.value}
            onChange={e => props.inputChangeHandler(e, section)}
            touched={props.inputData.dataStepRegistration.dataTabRegistration.registrationEmail.touched}
            valid={props.inputData.dataStepRegistration.dataTabRegistration.registrationEmail.valid}
            errMsg={props.inputData.dataStepRegistration.dataTabRegistration.registrationEmail.errorMessage}
          />
        </div>
        <div className={style.agreementsBlock}>

          <Checkbox
            name="agreementCheck1"
            value={props.inputData.dataStepRegistration.dataTabRegistration.agreementCheck1.value}
            onChange={e => props.inputChangeHandler(e, section)}
            inputData={props.inputData}
            labelText={<span>{props.localize('formAgreement1-1')} <a target="_blank" href="http://support1.ligazakon.ua/politika-konfidencijnosti-ta-obrobki-personalnix-danix?_ga=2.110428994.678135854.1558007503-292395073.1558007503">{props.localize('formAgreement1-2')}</a> {props.localize('formAgreement1-3')}</span>}
            touched={props.inputData.dataStepRegistration.dataTabRegistration.agreementCheck1.touched}
            valid={props.inputData.dataStepRegistration.dataTabRegistration.agreementCheck1.valid}
          />

          <Checkbox
            name="agreementCheck2"
            value={props.inputData.dataStepRegistration.dataTabRegistration.agreementCheck2.value}
            onChange={e => props.inputChangeHandler(e, section)}
            inputData={props.inputData}
            labelText={<span>{props.localize('formAgreement2-1')} <a target="_blank" href="http://jurliga.ligazakon.ua/page/agreement.htm">{props.localize('formAgreement2-2')}</a> {props.localize('formAgreement2-3')} <a target="_blank" href="http://jurliga.ligazakon.ua/page/specification.htm">{props.localize('formAgreement2-4')}</a></span>}
            touched={props.inputData.dataStepRegistration.dataTabRegistration.agreementCheck2.touched}
            valid={props.inputData.dataStepRegistration.dataTabRegistration.agreementCheck2.valid}
          />
        </div>
      </div>

      <input
        className={`${style.submitBtn} ${!props.formRegistrationIsValid ? style.nonActive : ''}`}
        data-stat="jurliga-catalog-registryform_next_step2-wo_id-button-2"
        type="submit"
        value={props.localize('registerBtn')}
        onClick={e => props.handleStepSubmit(e, 3)}
      />
    </form>
  );
}

export default TabRegistration;