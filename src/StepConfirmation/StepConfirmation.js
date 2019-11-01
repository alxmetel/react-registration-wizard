import React from 'react';
import style from './StepConfirmation.less';

const stepConfirmation = (props) => {

  const firmTypeId = props.firmType; // 0 - Individual; 1 - Entity
  const dataIndividual = props.inputData.dataStepInformation.dataIndividual;
  const dataEntity = props.inputData.dataStepInformation.dataEntity;
  let viewToDisplay = null;


  // Individual View

  let showIndividualNameBlock = () => {
    if (
      dataIndividual.individualLastName.value !== '' ||
      dataIndividual.individualFistName.value !== '' ||
      dataIndividual.individualPatronymicName.value !== ''
    ) {
      return true;
    } else {
      return false;
    }
  }
  let showIndividualAddressBlock = () => {
    if (
      dataIndividual.individualAddressRegion.valueDescription !== '' ||
      dataIndividual.individualAddressCity.valueDescription !== '' ||
      dataIndividual.individualAddressDistrict.valueDescription !== '' ||
      dataIndividual.individualAddressStreetPrefix.valueDescription !== '' ||
      dataIndividual.individualAddressStreet.value !== '' ||
      dataIndividual.individualAddressBuilding.value !== ''
    ) return true;
    else return false;
  }
  let showIndividualTypeBlock = dataIndividual.individualType.valueDescription !== '' ? true : false;
  let showIndividualTelephoneBlock = dataIndividual.individualTelephone.value !== '' ? true : false;
  let showIndividualEmailBlock = dataIndividual.individualEmail.value !== '' ? true : false;
  let showIndividualLicenseBlock = dataIndividual.individualLicenseLink.value !== '' ? true : false;

  const individualView = (
    <>
      <div className={style.firmTypeTitle}>{props.localize('aboutIndividualSubtitle')}</div>
      <div className={style.dataBlock}>

        <div className={style.column1}>
          <div className={`${style.dataItem} ${showIndividualNameBlock() ? '' : style.hidden}`}>
            <div className={style.subtitle}>{props.localize('itemTitleName')}</div>
            <div className={style.dataContent}>
              <span>{dataIndividual.individualLastName.value} </span>
              <span>{dataIndividual.individualFistName.value} </span>
              <span>{dataIndividual.individualPatronymicName.value}</span>
            </div>
          </div>
          <div className={`${style.dataItem} ${showIndividualTypeBlock ? '' : style.hidden}`}>
            <div className={style.subtitle}>{props.localize('itemTitleType')}</div>
            <div className={style.dataContent}>{dataIndividual.individualType.valueDescription}</div>
          </div>
          <div className={`${style.dataItem} ${showIndividualTelephoneBlock ? '' : style.hidden}`}>
            <div className={style.subtitle}>{props.localize('formTelephone')}</div>
            <div className={style.dataContent}>{dataIndividual.individualTelephone.value}</div>
          </div>
          <div className={`${style.dataItem} ${showIndividualEmailBlock ? '' : style.hidden}`}>
            <div className={style.subtitle}>E-mail</div>
            <div className={style.dataContent}>{dataIndividual.individualEmail.value}</div>
          </div>
        </div>

        <div className={style.column2}>
          <div className={`${style.dataItem} ${showIndividualAddressBlock() ? '' : style.hidden}`}>
            <div className={style.subtitle}>{props.localize('formStreet')}</div>
            <div className={style.dataContent}>
              <div>{dataIndividual.individualAddressRegion.valueDescription}</div>
              <div>{dataIndividual.individualAddressCity.valueDescription}</div>
              <div>{dataIndividual.individualAddressDistrict.valueDescription}</div>
              <div>
                <span>{dataIndividual.individualAddressStreetPrefix.valueDescription} </span>
                <span>{dataIndividual.individualAddressStreet.value} </span>
              </div>
              <div>{props.localize('addressBuilding')} {dataIndividual.individualAddressBuilding.value}</div>
            </div>
          </div>

          <div className={`${style.dataItem} ${showIndividualLicenseBlock ? '' : style.hidden}`}>
            <div className={style.subtitle}>{props.localize('formLicenseLink')}</div>
            <div className={style.dataContent}>{dataIndividual.individualLicenseLink.value}</div>
          </div>
        </div>

        <div className={style.column3}>
          <div className={`${style.imageFrame} ${style.round}`}>
            <div
              className={style.image}
              style={{ backgroundImage: `url(${dataIndividual.individualPhoto.value})` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );


  // Entity View

  let showCompanyAddressBlock = () => {
    if (
      dataEntity.companyAddressRegion.valueDescription !== '' ||
      dataEntity.companyAddressCity.valueDescription !== '' ||
      dataEntity.companyAddressDistrict.valueDescription !== '' ||
      dataEntity.companyAddressStreetPrefix.valueDescription !== '' ||
      dataEntity.companyAddressStreet.value !== '' ||
      dataEntity.companyAddressBuilding.value !== ''
    ) return true;
    else return false;
  }
  let showCompanyNameBlock = dataEntity.companyName.value !== '' ? true : false;
  let showCompanyTypeBlock = dataEntity.companyType.valueDescription !== '' ? true : false;
  let showCompanyTelephoneBlock = dataEntity.contactPersonTelephone.value !== '' ? true : false;
  let showCompanyEmailBlock = dataEntity.contactPersonEmail.value !== '' ? true : false;
  let showCompanyEmployeesNumBlock = dataEntity.companyEmployeesNum.valueDescription !== '' ? true : false;


  const entityView = (
    <>
      <div className={style.firmTypeTitle}>{props.localize('aboutCompanySubtitle')}</div>
      <div className={style.dataBlock}>

        <div className={style.column1}>
          <div className={`${style.dataItem} ${showCompanyNameBlock ? '' : style.hidden}`}>
            <div className={style.subtitle}>{props.localize('formCompanyName')}</div>
            <div className={style.dataContent}>{dataEntity.companyName.value}</div>
          </div>
          <div className={`${style.dataItem} ${showCompanyTypeBlock ? '' : style.hidden}`}>
            <div className={style.subtitle}>{props.localize('itemTitleType')}</div>
            <div className={style.dataContent}>{dataEntity.companyType.valueDescription}</div>
          </div>
          <div className={`${style.dataItem} ${showCompanyTelephoneBlock ? '' : style.hidden}`}>
            <div className={style.subtitle}>{props.localize('formTelephone')}</div>
            <div className={style.dataContent}>{dataEntity.contactPersonTelephone.value}</div>
          </div>
          <div className={`${style.dataItem} ${showCompanyEmailBlock ? '' : style.hidden}`}>
            <div className={style.subtitle}>E-mail</div>
            <div className={style.dataContent}>{dataEntity.contactPersonEmail.value}</div>
          </div>
        </div>

        <div className={style.column2}>
          <div className={`${style.dataItem} ${showCompanyAddressBlock() ? '' : style.hidden}`}>
            <div className={style.subtitle}>{props.localize('formStreet')}</div>
            <div className={style.dataContent}>
              <div>{dataEntity.companyAddressRegion.valueDescription}</div>
              <div>{dataEntity.companyAddressCity.valueDescription}</div>
              <div>{dataEntity.companyAddressDistrict.valueDescription}</div>
              <div>
                <span>{dataEntity.companyAddressStreetPrefix.valueDescription} </span>
                <span>{dataEntity.companyAddressStreet.value} </span>
              </div>
              <div>{props.localize('addressBuilding')} {dataEntity.companyAddressBuilding.value}</div>
            </div>
          </div>

          <div className={`${style.dataItem} ${showCompanyEmployeesNumBlock ? '' : style.hidden}`}>
            <div className={style.subtitle}>{props.localize('itemTitleEmployeeNum')}</div>
            <div className={style.dataContent}>{dataEntity.companyEmployeesNum.valueDescription}</div>
          </div>
        </div>

        <div className={style.column3}>
          <div className={style.imageFrame}>
            <div
              className={style.image}
              style={{ backgroundImage: `url(${dataEntity.companyLogo.value})` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );

  if (firmTypeId === 0) { // Individual
    viewToDisplay = individualView;

  } else if (firmTypeId === 1) { // Entity
    viewToDisplay = entityView;
  }

  return (
    <div className={`${style.stepConfirmation} ${style.container}`}>
      <h2 className={style.confirmationTitle}>{props.localize('confirmationStepTitle')}</h2>
      <div className={style.confirmationSubtitle}>{props.localize('confirmationStepDescription')}</div>
      <div className={style.horizontalDivider}></div>
      <div className={style.contentBlock}>

        {viewToDisplay}

        <div className={style.contentHorizontalDivider}></div>
        <div className={style.confirmationChangeBtnWrapper}>
          <div
            className={style.confirmationChangeBtn}
            data-stat="jurliga-catalog-registryform_change_step3-link-1"
            onClick={() => {
              props.switchStep(1);
              
              // For web stat
              let chosenEventAction = '';
              if (props.inputData.dataStepInformation.dataIndividual.individualLastName.value !== "") {
                chosenEventAction = `jurliga-catalog-registryform_se-change_step3-link-1-${props.inputData.dataStepInformation.dataIndividual.individualType.value}-${props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value}`;
              } else if (props.inputData.dataStepInformation.dataEntity.companyName.value !== "") {
                chosenEventAction = `jurliga-catalog-registryform_ce-change_step3-link-1-${props.inputData.dataStepInformation.dataEntity.companyType.value}-${props.inputData.dataStepInformation.dataEntity.companyEmployeesNum.value}-${props.inputData.dataStepInformation.dataEntity.companyAddressRegion.value}`;
              }

              dataLayer.push({
                'event': 'CatalogEvent',
                'eventCategory': 'jurCatalog-register',
                'eventAction': chosenEventAction,
                'eventLabel': window.location.href
              });
            }}>
            {props.localize('changeBtn')}
          </div>
        </div>
      </div>

      <input
        className={style.submitBtn}
        data-stat="jurliga-catalog-registryform_submit_step3-link-1"
        type="submit"
        value={props.localize('confirmBtn')}
        onClick={() => {
          props.executeRecaptcha();

          // For web stat
          let chosenEventAction = '';
          if (props.inputData.dataStepInformation.dataIndividual.individualLastName.value !== "") {
            chosenEventAction = `jurliga-catalog-registryform_se-submit_step3-link-1-${props.inputData.dataStepInformation.dataIndividual.individualType.value}-${props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value}`;
          } else if (props.inputData.dataStepInformation.dataEntity.companyName.value !== "") {
            chosenEventAction = `jurliga-catalog-registryform_ce-submit_step3-link-1-${props.inputData.dataStepInformation.dataEntity.companyType.value}-${props.inputData.dataStepInformation.dataEntity.companyEmployeesNum.value}-${props.inputData.dataStepInformation.dataEntity.companyAddressRegion.value}`;
          }

          dataLayer.push({
            'event': 'CatalogEvent',
            'eventCategory': 'jurCatalog-register',
            'eventAction': chosenEventAction,
            'eventLabel': window.location.href
          });
        }} />

      <div className={style.submitNotice}>{props.localize('followUpMsg')}</div>
    </div>
  )
}

export default stepConfirmation;