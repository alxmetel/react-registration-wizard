import React, { Component } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import ReactResizeDetector from 'react-resize-detector';
import style from './App.less';
import localization from './localization.json'
import validate from './Form/validate'
import StepInformation from './StepInformation/StepInformation';
import StepRegistration from './StepRegistration/StepRegistration';
import StepConfirmation from './StepConfirmation/StepConfirmation';
import StepSuccess from './StepSuccess/StepSuccess';
import NonVisibleView from './NonVisibleView/NonVisibleView';

const lang = document.getElementsByTagName('body')[0].getAttribute('lang');

const initialDataIndividual = {
  individualLastName: {
    value: '',
    placeholderText: localization.formFieldLastName[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      maxLength: 90
    },
    errorMessage: localization.errorFieldLastName[lang]
  },
  individualFistName: {
    value: '',
    placeholderText: localization.formFieldFirstName[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      maxLength: 85
    },
    errorMessage: localization.errorFieldFirstName[lang]
  },
  individualPatronymicName: {
    value: '',
    placeholderText: localization.formFieldPatronymicName[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      maxLength: 80
    },
    errorMessage: localization.errorFieldPatronymicName[lang]
  },
  individualType: {
    value: 0,
    valueDescription: '',
    placeholderText: localization.formIndividualType[lang],
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  individualLicenseCheck: {
    value: false,
    labelText: localization.formLicenseCheck[lang],
    valid: true,
    touched: false,
    validationRules: {},
  },
  individualLicenseLink: {
    value: '',
    placeholderText: localization.formLicenseLink[lang],
    focused: false,
    valid: true,
    touched: false,
    validationRules: {
      isRequired: true,
      maxLength: 40
    },
    errorMessage: localization.errorFieldLicenseLink[lang]
  },
  individualTelephone: {
    value: '',
    placeholderText: localization.formTelephone[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      maskIsFilled: true
    },
    errorMessage: localization.errorFieldTelephone[lang]
  },
  individualEmail: {
    value: '',
    placeholderText: 'E-mail',
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      isEmail: true,
      permittedDomains: true,
      nonCyrillic: true,
      maxLength: 60
    },
    errorMessage: localization.errorFieldEmail[lang]
  },
  individualAddressRegion: {
    value: 0,
    valueDescription: '',
    name: '',
    placeholderText: localization.formRegion[lang],
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  individualAddressCity: {
    value: 0,
    valueDescription: '',
    placeholderText: localization.formCity[lang],
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  individualAddressDistrict: {
    value: 0,
    valueDescription: '',
    placeholderText: localization.formDistrict[lang],
    valid: true,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  individualAddressStreetPrefix: {
    value: 0,
    valueDescription: '',
    placeholderText: localization.formStreetType[lang],
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  individualAddressStreet: {
    value: '',
    placeholderText: localization.formStreet[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      maxLength: 50
    },
    errorMessage: localization.errorFieldStreet[lang]
  },
  individualAddressBuilding: {
    value: '',
    placeholderText: localization.formBuilding[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      maxLength: 10
    },
    errorMessage: localization.errorFieldBuilding[lang]
  },
  individualPhoto: {
    value: '',
    extension: '',
    valid: true,
    touched: false,
    validationRules: {}
  }
}

const initialDataEntity = {
  companyName: {
    value: '',
    placeholderText: localization.formCompanyName[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      maxLength: 100
    },
    errorMessage: localization.errorFieldCompanyName[lang]
  },
  companyType: {
    value: 0,
    valueDescription: '',
    placeholderText: localization.formCompanyType[lang],
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  companyEmployeesNum: {
    value: 0,
    valueDescription: '',
    placeholderText: localization.formCompanyEmployeesNum[lang],
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  contactPersonEmail: {
    value: '',
    placeholderText: 'E-mail',
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      isEmail: true,
      permittedDomains: true,
      nonCyrillic: true,
      maxLength: 60
    },
    errorMessage: localization.errorFieldEmail[lang]
  },
  contactPersonTelephone: {
    value: '',
    placeholderText: localization.formTelephone[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      maskIsFilled: true
    },
    errorMessage: localization.errorFieldTelephone[lang]
  },
  companyAddressRegion: {
    value: 0,
    valueDescription: '',
    placeholderText: localization.formRegion[lang],
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  companyAddressCity: {
    value: 0,
    valueDescription: '',
    placeholderText: localization.formCity[lang],
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  companyAddressDistrict: {
    value: 0,
    valueDescription: '',
    placeholderText: localization.formDistrict[lang],
    valid: true,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  companyAddressStreetPrefix: {
    value: 0,
    valueDescription: '',
    placeholderText: localization.formStreetType[lang],
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldSelect[lang]
  },
  companyAddressStreet: {
    value: '',
    placeholderText: localization.formStreet[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      maxLength: 50
    },
    errorMessage: localization.errorFieldStreet[lang]
  },
  companyAddressBuilding: {
    value: '',
    placeholderText: localization.formBuilding[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      maxLength: 10
    },
    errorMessage: localization.errorFieldBuilding[lang]
  },
  companyLogo: {
    value: '',
    extension: '',
    valid: true,
    touched: false,
    validationRules: {}
  }
}

const initialDataRegistration = {
  registrationEmail: {
    value: '',
    placeholderText: 'E-mail',
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      isEmail: true,
      permittedDomains: true,
      nonCyrillic: true,
      maxLength: 60
    },
    errorMessage: localization.errorFieldEmail[lang]
  },
  agreementCheck1: {
    value: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      isChecked: true
    },
  },
  agreementCheck2: {
    value: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      isChecked: true
    },
  },
}

const initialDataAuthorization = {
  authorizationEmail: {
    value: '',
    placeholderText: 'LIGA:ID / E-mail',
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      isEmail: true,
      permittedDomains: true,
      nonCyrillic: true,
      maxLength: 60
    },
    errorMessage: localization.errorFieldEmail[lang]
  },
  authorizationPassword: {
    value: '',
    placeholderText: localization.formPassword[lang],
    focused: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
    errorMessage: localization.errorFieldPassword[lang],
  },
  agreementCheck1: {
    value: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      isChecked: true
    }
  },
  agreementCheck2: {
    value: false,
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      isChecked: true
    }
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      localize: localization,
      loaderIsShown: false,
      inputData: {
        dataStepInformation: {
          dataIndividual: initialDataIndividual,
          dataEntity: initialDataEntity
        },
        dataStepRegistration: {
          dataTabRegistration: initialDataRegistration,
          dataTabAuthorization: initialDataAuthorization
        }
      },
      dataToSubmit: {
        req_package_id: 5,
        firmType: '',
        flpModel: {
          firstName: '',
          name: '',
          lastName: '',
          type: '',
          hasLicense: '',
          licenseLink: '',
          contactPhone: '',
          contactEmail: '',
          regionID: '',
          cityID: '',
          streetType: '',
          streetName: '',
          building: '',
          photo: '',
          photo_ext: ''
        },
        firmModel: {
          title: '',
          type: '',
          countEmployyes: '',
          contactPhone: '',
          contactEmail: '',
          regionID: '',
          cityID: '',
          streetType: '',
          streetName: '',
          building: '',
          photo: '',
          photo_ext: ''
        },
        subpracticIDs: [],
        hasLigaID: '',
        LigaID: '',
        Password: ''
      },
      activeStep: 1,
      activeFirmType: 0,
      hasLigaID: false,
      ligaIDFromSession: false,
      formIndividualIsValid: false,
      formEntityIsValid: false,
      formRegistrationIsValid: false,
      formAuthorizationIsValid: false
    };

    this.recaptchaRef = React.createRef();
    this.localize = this.localize.bind(this);
    this.showWizard = this.showWizard.bind(this);
    this.switchStep = this.switchStep.bind(this);
    this.showStepView = this.showStepView.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.inputFocusHandler = this.inputFocusHandler.bind(this);
    this.addImageData = this.addImageData.bind(this);
    this.setFirmType = this.setFirmType.bind(this);
    this.setHasLigaID = this.setHasLigaID.bind(this);
    this.showAllUnvalidFields = this.showAllUnvalidFields.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleStepSubmit = this.handleStepSubmit.bind(this);
    this.executeRecaptcha = this.executeRecaptcha.bind(this);
    this.getRecaptchaToken = this.getRecaptchaToken.bind(this);
    this.formDataToSubmit = this.formDataToSubmit.bind(this);
    this.runGeneralSubmit = this.runGeneralSubmit.bind(this);
    this.handleGeneralSubmitResult = this.handleGeneralSubmitResult.bind(this);
    this.useCurrentLigaId = this.useCurrentLigaId.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
  }

  componentDidMount() {

    // Show/hide wizard
    this.showWizard(this.state.activeStep);

    // Get SiteKey (for Recaptcha)
    axios.get(recaptchaURL + '/lz-platforma/auth/v2.0/registration/recaptcha/invisible/public')
      .then(response => {
        this.setState({
          siteKey: response.data.publicKey
        });
      });
  }

  formDataToSubmit = () => {
    const hasLigaId = this.state.hasLigaID;
    const ligaId =
      hasLigaId ?
      this.state.inputData.dataStepRegistration.dataTabAuthorization.authorizationEmail.value :
      this.state.inputData.dataStepRegistration.dataTabRegistration.registrationEmail.value;

    this.setState(prevState => ({
      dataToSubmit: {
        ...prevState.dataToSubmit,
          firmType:           this.state.activeFirmType,
          flpModel: {
            ...prevState.dataToSubmit.flpModel,
              firstName:      this.state.inputData.dataStepInformation.dataIndividual.individualFistName.value,
              name:           this.state.inputData.dataStepInformation.dataIndividual.individualPatronymicName.value,
              lastName:       this.state.inputData.dataStepInformation.dataIndividual.individualLastName.value,
              type:           this.state.inputData.dataStepInformation.dataIndividual.individualType.value,
              hasLicense:     this.state.inputData.dataStepInformation.dataIndividual.individualLicenseCheck.value,
              licenseLink:    this.state.inputData.dataStepInformation.dataIndividual.individualLicenseLink.value,
              contactPhone:   this.state.inputData.dataStepInformation.dataIndividual.individualTelephone.value,
              contactEmail:   this.state.inputData.dataStepInformation.dataIndividual.individualEmail.value,
              regionID:       this.state.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value,
              cityID:         this.state.inputData.dataStepInformation.dataIndividual.individualAddressCity.value,
              districtID:     this.state.inputData.dataStepInformation.dataIndividual.individualAddressDistrict.value,
              streetType:     this.state.inputData.dataStepInformation.dataIndividual.individualAddressStreetPrefix.value,
              streetName:     this.state.inputData.dataStepInformation.dataIndividual.individualAddressStreet.value,
              building:       this.state.inputData.dataStepInformation.dataIndividual.individualAddressBuilding.value,
              photo:          this.state.inputData.dataStepInformation.dataIndividual.individualPhoto.value,
              photo_ext:      this.state.inputData.dataStepInformation.dataIndividual.individualPhoto.extension
          },
          firmModel: {
            ...prevState.dataToSubmit.firmModel,
              title:          this.state.inputData.dataStepInformation.dataEntity.companyName.value,
              type:           this.state.inputData.dataStepInformation.dataEntity.companyType.value,
              countEmployyes: this.state.inputData.dataStepInformation.dataEntity.companyEmployeesNum.value,
              contactPhone:   this.state.inputData.dataStepInformation.dataEntity.contactPersonTelephone.value,
              contactEmail:   this.state.inputData.dataStepInformation.dataEntity.contactPersonEmail.value,
              regionID:       this.state.inputData.dataStepInformation.dataEntity.companyAddressRegion.value,
              cityID:         this.state.inputData.dataStepInformation.dataEntity.companyAddressCity.value,
              districtID:     this.state.inputData.dataStepInformation.dataEntity.companyAddressDistrict.value,
              streetType:     this.state.inputData.dataStepInformation.dataEntity.companyAddressStreetPrefix.value,
              streetName:     this.state.inputData.dataStepInformation.dataEntity.companyAddressStreet.value,
              building:       this.state.inputData.dataStepInformation.dataEntity.companyAddressBuilding.value,
              photo:          this.state.inputData.dataStepInformation.dataEntity.companyLogo.value,
              photo_ext:      this.state.inputData.dataStepInformation.dataEntity.companyLogo.extension
          },
          hasLigaID:          hasLigaId,
          LigaID:             ligaId,
          Password:           this.state.inputData.dataStepRegistration.dataTabAuthorization.authorizationPassword.value,
          LigaIDFromSession:  this.state.ligaIDFromSession
      }
    }));
  }

  // Show Wizard only on screens above 1200px wide
  prevStep = 1;
  showWizard = (activeStep) => {
    const mq = window.matchMedia('(max-width: 1200px)');

    if (activeStep !== 0) {
      this.prevStep = activeStep;
    }

    if (mq.matches) {
      this.switchStep(0);
    } else {
      this.switchStep(this.prevStep);
    }
  }

  showLoader = () => {
    this.setState({
      loaderIsShown: true
    });
  }

  hideLoader = () => {
    this.setState({
      loaderIsShown: false
    });
  }

  localize = (key) => {
    return this.state.localize[key][lang];
  }

  showStepView = () => {
    let stepView = '';

    switch(this.state.activeStep) {
      case 0 :
        stepView = <NonVisibleView
          localize = {this.localize}
        />;
        break;
      case 1 :
        stepView = <StepInformation
          localize = {this.localize}
          activeStep={this.state.activeStep}
          setFirmType = {this.setFirmType}
          activeFirmType={this.state.activeFirmType}
          inputChangeHandler = {this.inputChangeHandler}
          inputFocusHandler = {this.inputFocusHandler}
          addImageData = {this.addImageData}
          inputData = {this.state.inputData}
          formIndividualIsValid = {this.state.formIndividualIsValid}
          formEntityIsValid = {this.state.formEntityIsValid}
          handleStepSubmit = {this.handleStepSubmit}
          setDistrictFieldValidity = {this.setDistrictFieldValidity}
        />;
        break;
      case 2 :
        stepView = <StepRegistration
          localize = {this.localize}
          setHasLigaID={this.setHasLigaID}
          hasLigaID={this.state.hasLigaID}
          activeStep={this.state.activeStep}
          inputChangeHandler = {this.inputChangeHandler}
          inputFocusHandler = {this.inputFocusHandler}
          inputData = {this.state.inputData}
          formRegistrationIsValid = {this.state.formRegistrationIsValid}
          formAuthorizationIsValid = {this.state.formAuthorizationIsValid}
          handleStepSubmit = {this.handleStepSubmit}
          useCurrentLigaId = {this.useCurrentLigaId}
          currLigaIdUsed = {this.state.ligaIDFromSession}
        />;
        break;
      case 3 :
        stepView = <StepConfirmation
          localize = {this.localize}
          switchStep = {this.switchStep}
          activeStep={this.state.activeStep}
          inputData = {this.state.inputData}
          firmType = {this.state.activeFirmType}
          executeRecaptcha = {this.executeRecaptcha}
        />;
        break;
      case 4 :
        stepView = <StepSuccess
          localize = {this.localize}
        />;
        break;
    }
    return stepView;
  }

  switchStep = (stepId) => {
    this.setState({
      activeStep: stepId
    });
    window.scrollTo(0, 0); // Scroll to top
  }

  setFirmType = (firmTypeId) => {
    this.setState({
      activeFirmType: firmTypeId
    },() => this.clearForm()); // callback
  }

  setHasLigaID = (bool) => {
    this.setState({
      hasLigaID: bool
    },() => this.clearForm()); // callback
  }

  // Handle Step Submit Buttons
  handleStepSubmit = (e, stepToGo) => {
    e.preventDefault();
    const activeStep = this.state.activeStep;
    const firmTypeId = this.state.activeFirmType;
    const hasLigaID = this.state.hasLigaID;
    const formIndividualIsValid = this.state.formIndividualIsValid;
    const formEntityIsValid = this.state.formEntityIsValid;
    const formRegistrationIsValid = this.state.formRegistrationIsValid;
    const formAuthorizationIsValid = this.state.formAuthorizationIsValid;

    // For Web Stat
    let webStatEventAction = '';
    const pushToDataLayer = () => {
      dataLayer.push({
        'event': 'CatalogEvent',
        'eventCategory': 'jurCatalog-register',
        'eventAction': webStatEventAction,
        'eventLabel': window.location.href
      });
    }

    if (activeStep === 1) { // Step Information
      if (firmTypeId === 0) { // Tab Individual
        if (formIndividualIsValid) {
          this.switchStep(stepToGo);
          webStatEventAction = `reg-se-step1-${this.state.inputData.dataStepInformation.dataIndividual.individualType.value}-${this.state.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value}`;
          pushToDataLayer();
        } else {
          this.showAllUnvalidFields();
        }

      } else if (firmTypeId === 1) { // Tab Entity
        if (formEntityIsValid) {
          this.switchStep(stepToGo);
          webStatEventAction = `reg-ce-step1-${this.state.inputData.dataStepInformation.dataEntity.companyType.value}-${this.state.inputData.dataStepInformation.dataEntity.companyEmployeesNum.value}-${this.state.inputData.dataStepInformation.dataEntity.companyAddressRegion.value}`;
          pushToDataLayer();
        } else {
          this.showAllUnvalidFields();
        }
      }

    } else if (activeStep === 2) { // Step Registration
      if (hasLigaID) { // Tab Authorization
        if (formAuthorizationIsValid) {
          this.switchStep(stepToGo);

          // For Web Stat
          if (this.state.inputData.dataStepInformation.dataIndividual.individualLastName.value !== "") {
            webStatEventAction = `reg-se-step2-by_id-${this.state.inputData.dataStepInformation.dataIndividual.individualType.value}-${this.state.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value}`;
            pushToDataLayer();
          } else if (this.state.inputData.dataStepInformation.dataEntity.companyName.value !== "") {
            webStatEventAction = `reg-ce-step2-by_id-${this.state.inputData.dataStepInformation.dataEntity.companyType.value}-${this.state.inputData.dataStepInformation.dataEntity.companyEmployeesNum.value}-${this.state.inputData.dataStepInformation.dataEntity.companyAddressRegion.value}`;
            pushToDataLayer();
          }
        } else {
          this.showAllUnvalidFields();
        }

      } else { // Tab Registration
        if (formRegistrationIsValid) {
          this.switchStep(stepToGo);

          // For Web Stat
          if (this.state.inputData.dataStepInformation.dataIndividual.individualLastName.value !== "") {
            webStatEventAction = `reg-se-step2-wo_id-${this.state.inputData.dataStepInformation.dataIndividual.individualType.value}-${this.state.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value}`;
            pushToDataLayer();
          } else if (this.state.inputData.dataStepInformation.dataEntity.companyName.value !== "") {
            webStatEventAction = `reg-ce-step2-wo_id-${this.state.inputData.dataStepInformation.dataEntity.companyType.value}-${this.state.inputData.dataStepInformation.dataEntity.companyEmployeesNum.value}-${this.state.inputData.dataStepInformation.dataEntity.companyAddressRegion.value}`;
            pushToDataLayer();
          }
        } else {
          this.showAllUnvalidFields();
        }
      }
    }
  }

  // Show All Unvalid Fields
  showAllUnvalidFields = () => {
    const activeStep = this.state.activeStep;
    const firmTypeId = this.state.activeFirmType;
    const hasLigaID = this.state.hasLigaID;

    if (activeStep === 1) { // Step Information

      if (firmTypeId === 0) { // Tab Individual

        this.setState(prevState => ({
          inputData: {
            ...prevState.inputData,
              dataStepInformation: {
                ...prevState.inputData.dataStepInformation,
                  dataIndividual: {
                    ...prevState.inputData.dataStepInformation.dataIndividual,
                      individualLastName: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualLastName,
                        touched: true
                      },
                      individualFistName: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualFistName,
                        touched: true
                      },
                      individualPatronymicName: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualPatronymicName,
                        touched: true
                      },
                      individualType: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualType,
                        touched: true
                      },
                      individualLicenseCheck: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualLicenseCheck,
                        touched: true
                      },
                      individualLicenseLink: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualLicenseLink,
                        touched: true
                      },
                      individualTelephone: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualTelephone,
                        touched: true
                      },
                      individualEmail: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualEmail,
                        touched: true
                      },
                      individualAddressRegion: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualAddressRegion,
                        touched: true
                      },
                      individualAddressCity: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualAddressCity,
                        touched: true
                      },
                      individualAddressDistrict: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualAddressDistrict,
                        touched: true
                      },
                      individualAddressStreetPrefix: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualAddressStreetPrefix,
                        touched: true
                      },
                      individualAddressStreet: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualAddressStreet,
                        touched: true
                      },
                      individualAddressBuilding: {
                        ...prevState.inputData.dataStepInformation.dataIndividual.individualAddressBuilding,
                        touched: true
                      },
                  }
              }
          },
        }));
  
      } else if (firmTypeId === 1) { // Tab Entity
        this.setState(prevState => ({
          inputData: {
            ...prevState.inputData,
              dataStepInformation: {
                ...prevState.inputData.dataStepInformation,
                  dataEntity: {
                    ...prevState.inputData.dataStepInformation.dataEntity,
                      companyName: {
                        ...prevState.inputData.dataStepInformation.dataEntity.companyName,
                        touched: true
                      },
                      companyType: {
                        ...prevState.inputData.dataStepInformation.dataEntity.companyType,
                        touched: true
                      },
                      companyEmployeesNum: {
                        ...prevState.inputData.dataStepInformation.dataEntity.companyEmployeesNum,
                        touched: true
                      },
                      contactPersonEmail: {
                        ...prevState.inputData.dataStepInformation.dataEntity.contactPersonEmail,
                        touched: true
                      },
                      contactPersonTelephone: {
                        ...prevState.inputData.dataStepInformation.dataEntity.contactPersonTelephone,
                        touched: true
                      },
                      companyAddressRegion: {
                        ...prevState.inputData.dataStepInformation.dataEntity.companyAddressRegion,
                        touched: true
                      },
                      companyAddressCity: {
                        ...prevState.inputData.dataStepInformation.dataEntity.companyAddressCity,
                        touched: true
                      },
                      companyAddressDistrict: {
                        ...prevState.inputData.dataStepInformation.dataEntity.companyAddressDistrict,
                        touched: true
                      },
                      companyAddressStreetPrefix: {
                        ...prevState.inputData.dataStepInformation.dataEntity.companyAddressStreetPrefix,
                        touched: true
                      },
                      companyAddressStreet: {
                        ...prevState.inputData.dataStepInformation.dataEntity.companyAddressStreet,
                        touched: true
                      },
                      companyAddressBuilding: {
                        ...prevState.inputData.dataStepInformation.dataEntity.companyAddressBuilding,
                        touched: true
                      },
                  }
              }
          },
        }));
      }

    } else if (activeStep === 2) { // Step Registration

      if (hasLigaID) { // Tab Authorization
        this.setState(prevState => ({
          inputData: {
            ...prevState.inputData,
              dataStepRegistration: {
                ...prevState.inputData.dataStepRegistration,
                  dataTabAuthorization: {
                    ...prevState.inputData.dataStepRegistration.dataTabAuthorization,
                      authorizationEmail: {
                        ...prevState.inputData.dataStepRegistration.dataTabAuthorization.authorizationEmail,
                        touched: true
                      },
                      authorizationPassword: {
                        ...prevState.inputData.dataStepRegistration.dataTabAuthorization.authorizationPassword,
                        touched: true
                      },
                      agreementCheck1: {
                        ...prevState.inputData.dataStepRegistration.dataTabAuthorization.agreementCheck1,
                        touched: true
                      },
                      agreementCheck2: {
                        ...prevState.inputData.dataStepRegistration.dataTabAuthorization.agreementCheck2,
                        touched: true
                      },
                  }
              }
          },
        }));

      } else { // Tab Registration
        this.setState(prevState => ({
          inputData: {
            ...prevState.inputData,
              dataStepRegistration: {
                ...prevState.inputData.dataStepRegistration,
                  dataTabRegistration: {
                    ...prevState.inputData.dataStepRegistration.dataTabRegistration,
                      registrationEmail: {
                        ...prevState.inputData.dataStepRegistration.dataTabRegistration.registrationEmail,
                        touched: true
                      },
                      agreementCheck1: {
                        ...prevState.inputData.dataStepRegistration.dataTabRegistration.agreementCheck1,
                        touched: true
                      },
                      agreementCheck2: {
                        ...prevState.inputData.dataStepRegistration.dataTabRegistration.agreementCheck2,
                        touched: true
                      },
                  }
              }
          },
        }));
      }
    }
  }

  // Clear unselected tabs
  clearForm = () => {
    const activeStep = this.state.activeStep;
    const activeFirmType = this.state.activeFirmType;

    if (activeStep === 1) {

      if (activeFirmType === 0) { // Step Information
        this.setState(prevState => ({
          inputData: {
            ...prevState.inputData,
              dataStepInformation: {
                ...prevState.inputData.dataStepInformation,
                  dataEntity: initialDataEntity
              }
          },
          formEntityIsValid: false
        }));
      } else if (activeFirmType === 1) {
        this.setState(prevState => ({
          inputData: {
            ...prevState.inputData,
              dataStepInformation: {
                ...prevState.inputData.dataStepInformation,
                  dataIndividual: initialDataIndividual
              }
          },
          formIndividualIsValid: false
        }));
      }
    } else if (activeStep === 2) { // Step Registration

      if (this.state.hasLigaID) {
        this.setState(prevState => ({
          inputData: {
            ...prevState.inputData,
              dataStepRegistration: {
                ...prevState.inputData.dataStepRegistration,
                  dataTabRegistration: initialDataRegistration
              }
          },
          formRegistrationIsValid: false 
        }));
      } else {
        this.setState(prevState => ({
          inputData: {
            ...prevState.inputData,
              dataStepRegistration: {
                ...prevState.inputData.dataStepRegistration,
                  dataTabAuthorization: initialDataAuthorization
              }
          },
          formAuthorizationIsValid: false
        }));
      }
    }

  }

  // Add Image Data
  addImageData = (file, section) => {
    let fileBase64 = file.base64;
    let fileType = file.type;
    let fileExtension = fileType.substring(fileType.lastIndexOf('/') + 1);

    switch(section) {
      case 'stepInformation-individual' :
        this.setState(prevState => ({
          inputData: {
            ...prevState.inputData,
            dataStepInformation: {
              ...prevState.inputData.dataStepInformation,
              dataIndividual: {
                ...prevState.inputData.dataStepInformation.dataIndividual,
                  individualPhoto: {
                    ...prevState.inputData.dataStepInformation.dataIndividual.individualPhoto,
                    value: fileBase64,
                    extension: fileExtension
                  }
              }
            }
          }
        }));
        break;

      case 'stepInformation-entity' :
        this.setState(prevState => ({
          inputData: {
            ...prevState.inputData,
            dataStepInformation: {
              ...prevState.inputData.dataStepInformation,
              dataEntity: {
                ...prevState.inputData.dataStepInformation.dataEntity,
                  companyLogo: {
                    ...prevState.inputData.dataStepInformation.dataEntity.companyLogo,
                    value: fileBase64,
                    extension: fileExtension
                  }
              }
            }
          }
        }));
        break;
    }
  }

  // Input Focus Handler (floating labels)
  inputFocusHandler = (event, bool, section) => {
    const elemName = event.target.name;
    let focusedValue = '';
    let stepName = '';
    let tabName = '';

    if (section === 'stepInformation-individual') {
      stepName = 'dataStepInformation';
      tabName = 'dataIndividual';
    } else if (section === 'stepInformation-entity') {
      stepName = 'dataStepInformation';
      tabName = 'dataEntity';
    } else if (section === 'stepRegistration-registration') {
      stepName = 'dataStepRegistration';
      tabName = 'dataTabRegistration';
    } else if (section === 'stepRegistration-authorization') {
      stepName = 'dataStepRegistration';
      tabName = 'dataTabAuthorization';
    }

    // Leave label floated if input is not empty
    if (!bool && this.state.inputData[stepName][tabName][elemName].value !== '') {
      focusedValue = true;
    } else {
      focusedValue = bool;
    }

    this.setState(prevState => ({
      inputData: {
        ...prevState.inputData,
        [stepName]: {
          ...prevState.inputData[stepName],
          [tabName]: {
            ...prevState.inputData[stepName][tabName],
            [elemName]: {
              ...prevState.inputData[stepName][tabName][elemName],
              focused: focusedValue
            }
          }
        }
      }
    }));
  }

  // Set validity of District fields
  setDistrictFieldValidity = (section, bool) => {
    let tabName = '';
    let districtField = '';
    if (section === 'stepInformation-individual') {
      tabName = 'dataIndividual';
      districtField = 'individualAddressDistrict';
    } else if (section === 'stepInformation-entity') {
      tabName = 'dataEntity';
      districtField = 'companyAddressDistrict';
    }
    this.setState(prevState => ({
      inputData: {
        ...prevState.inputData,
        dataStepInformation: {
          ...prevState.inputData.dataStepInformation,
          [tabName]: {
            ...prevState.inputData.dataStepInformation[tabName],
            [districtField]: {
              ...prevState.inputData.dataStepInformation[tabName][districtField],
              valid: bool,
            }
          }
        }
      }
    }), () => this.checkFormValidity(section));
  }

  // Check Form Validity
  checkFormValidity = section => {
    let formIsValid = true;
    let formData = '';
    const updatedControls = {...this.state.inputData};

    switch(section) {

      case 'stepInformation-individual':
        formData = updatedControls.dataStepInformation.dataIndividual;
        for (let inputIdentifier in formData) {
          formIsValid = formData[inputIdentifier].valid && formIsValid;
        }
        this.setState({
          formIndividualIsValid: formIsValid
        });
        break;

      case 'stepInformation-entity' :
        formData = updatedControls.dataStepInformation.dataEntity;
        for (let inputIdentifier in formData) {
          formIsValid = formData[inputIdentifier].valid && formIsValid;
        }
        this.setState({
          formEntityIsValid: formIsValid
        });
        break;
    }
  }

  // Input Change Handler
  inputChangeHandler = (event, section) => {
    let name = event.target.name;
    let value = event.target.value;
    let valueDescription = '';

    // Convert value to integer
    if (
      name === 'individualType' ||
      name === 'individualAddressRegion' ||
      name === 'individualAddressCity' ||
      name === 'individualAddressDistrict' ||
      name === 'individualAddressStreetPrefix' ||
      name === 'individualLicenseCheck' ||
      name === 'companyType' ||
      name === 'companyEmployeesNum' ||
      name === 'companyAddressRegion' ||
      name === 'companyAddressCity' ||
      name === 'companyAddressDistrict' ||
      name === 'companyAddressStreetPrefix'
    ) {
      value = +value;
    }

    // Convert value to boolean
    if (
      name === 'individualLicenseCheck' ||
      name === 'agreementCheck1' ||
      name === 'agreementCheck2'
    ) {
      value = event.target.checked ? true : false;
    }

    // Set the value description for Radio inputs
    if (event.target.type === 'radio') {
      valueDescription = event.target.nextSibling.data;
    }

    // Set the value description for Select inputs
    if (event.target.type === 'select-one') {
      const selectOptions = event.target.children; // HTMLCollection
      for (let i = 0; i < selectOptions.length; i++) {
        if (+selectOptions[i].value === value) {
          valueDescription = selectOptions[i].text;
        }
      }
    }

    let updatedControls = {};
    let updatedFormElement = {};
    let formIsValid = true;
    let formData = '';

    switch(section) {

      // Step-Information / Type-Individual
      case 'stepInformation-individual' :
        updatedControls = {
          ...this.state.inputData,
          dataStepInformation: {
            ...this.state.inputData.dataStepInformation,
            dataIndividual: {
              ...this.state.inputData.dataStepInformation.dataIndividual
            }
          }
        };

        updatedFormElement = {
          ...updatedControls.dataStepInformation.dataIndividual[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.valueDescription = valueDescription;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls.dataStepInformation.dataIndividual[name] = updatedFormElement;

        // Handle individualLicenseLink Field
        if (name === 'individualLicenseCheck') {
          const licenseIsChecked = value;

          updatedFormElement = {
            ...updatedControls.dataStepInformation.dataIndividual.individualLicenseLink // individualLicenseLink
          }

          updatedFormElement.valid = !licenseIsChecked;

          if (!licenseIsChecked) {
            updatedFormElement.value = '';
            updatedFormElement.focused = false;
          }
          updatedControls.dataStepInformation.dataIndividual.individualLicenseLink = updatedFormElement;
        }

        // Handle individualAddressRegion Field
        if (name === 'individualAddressRegion') {
          updatedFormElement = {
            ...updatedControls.dataStepInformation.dataIndividual
          }

          updatedFormElement.individualAddressCity.value = 0;
          updatedFormElement.individualAddressCity.valid = false;
          updatedFormElement.individualAddressDistrict.value = 0;
          updatedFormElement.individualAddressDistrict.valid = true;

          updatedControls.dataStepInformation.dataIndividual = updatedFormElement;
        }

        // Handle individualAddressCity Field
        if (name === 'individualAddressCity') {
          updatedFormElement = {
            ...updatedControls.dataStepInformation.dataIndividual
          }
          updatedFormElement.individualAddressDistrict.value = 0;
          updatedFormElement.individualAddressDistrict.valueDescription = '';
          updatedControls.dataStepInformation.dataIndividual = updatedFormElement;
        }


        formData = updatedControls.dataStepInformation.dataIndividual;
        for (let inputIdentifier in formData) {
          formIsValid = formData[inputIdentifier].valid && formIsValid;
        }

        this.setState({
          inputData: updatedControls,
          formIndividualIsValid: formIsValid
        });
        break;

      // Step-Information / Type-Entity
      case 'stepInformation-entity' :
        updatedControls = {
          ...this.state.inputData,
          dataStepInformation: {
            ...this.state.inputData.dataStepInformation,
            dataEntity: {
              ...this.state.inputData.dataStepInformation.dataEntity
            }
          }
        };
        updatedFormElement = {
          ...updatedControls.dataStepInformation.dataEntity[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.valueDescription = valueDescription;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls.dataStepInformation.dataEntity[name] = updatedFormElement;

        // Handle companyAddressRegion Field
        if (name === 'companyAddressRegion') {
          updatedFormElement = {
            ...updatedControls.dataStepInformation.dataEntity
          }

          updatedFormElement.companyAddressCity.value = 0;
          updatedFormElement.companyAddressCity.valid = false;
          updatedFormElement.companyAddressDistrict.value = 0;
          updatedFormElement.companyAddressDistrict.valid = true;

          updatedControls.dataStepInformation.dataEntity = updatedFormElement;
        }

        // Handle companyAddressCity Field
        if (name === 'companyAddressCity') {
          updatedFormElement = {
            ...updatedControls.dataStepInformation.dataEntity
          }
          updatedFormElement.companyAddressDistrict.value = 0;
          updatedFormElement.companyAddressDistrict.valueDescription = '';
          updatedControls.dataStepInformation.dataEntity = updatedFormElement;
        }

        formData = updatedControls.dataStepInformation.dataEntity;
        for (let inputIdentifier in formData) {
          formIsValid = formData[inputIdentifier].valid && formIsValid;
        }

        this.setState({
          inputData: updatedControls,
          formEntityIsValid: formIsValid
        });
        break;

      // Step-Registration / Registration
      case 'stepRegistration-registration' :
        updatedControls = {
          ...this.state.inputData,
          dataStepRegistration: {
            ...this.state.inputData.dataStepRegistration,
            dataTabRegistration: {
              ...this.state.inputData.dataStepRegistration.dataTabRegistration
            }
          }
        };

        updatedFormElement = {
          ...updatedControls.dataStepRegistration.dataTabRegistration[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.valueDescription = valueDescription;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls.dataStepRegistration.dataTabRegistration[name] = updatedFormElement;

        formData = updatedControls.dataStepRegistration.dataTabRegistration;
        for (let inputIdentifier in formData) {
          formIsValid = formData[inputIdentifier].valid && formIsValid;
        }

        this.setState({
          inputData: updatedControls,
          formRegistrationIsValid: formIsValid
        });
        break;

      // Step-Registration / Authorization
      case 'stepRegistration-authorization' :
        updatedControls = {
          ...this.state.inputData,
          dataStepRegistration: {
            ...this.state.inputData.dataStepRegistration,
            dataTabAuthorization: {
              ...this.state.inputData.dataStepRegistration.dataTabAuthorization
            }
          }
        };

        updatedFormElement = {
          ...updatedControls.dataStepRegistration.dataTabAuthorization[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.valueDescription = valueDescription;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls.dataStepRegistration.dataTabAuthorization[name] = updatedFormElement;

        formData = updatedControls.dataStepRegistration.dataTabAuthorization;
        for (let inputIdentifier in formData) {
          formIsValid = formData[inputIdentifier].valid && formIsValid;
        }

        this.setState({
          inputData: updatedControls,
          formAuthorizationIsValid: formIsValid
        });
        break;
    }
  }

  // Use Current Liga ID
  useCurrentLigaId = () => {

    axios.get('/api/platformaheader/GetUserInfo')
      .then(response => {
        if (response.data.IsAuthenticated) {
          this.setState(prevState => ({
              ligaIDFromSession: true,
              inputData: {
                ...prevState.inputData,
                dataStepRegistration: {
                  ...prevState.inputData.dataStepRegistration,
                  dataTabAuthorization: {
                    ...prevState.inputData.dataStepRegistration.dataTabAuthorization,
                    authorizationEmail: {
                      ...prevState.inputData.dataStepRegistration.dataTabAuthorization.authorizationEmail,
                      value: response.data.Login,
                      valid: true,
                      focused: true
                    },
                    authorizationPassword: {
                      ...prevState.inputData.dataStepRegistration.dataTabAuthorization.authorizationPassword,
                      value: response.data.Login,
                      valid: true,
                      focused: true
                    }
                  }
                }
              }
            }));
        } else {
          alert(localization.errorNotAuthorized[lang]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Recaptcha
  executeRecaptcha = () => {

    // Show loader Screen
    this.showLoader();

    this.recaptchaRef.current.reset();
    this.recaptchaRef.current.execute();
  }
  getRecaptchaToken = (recaptchaToken) => {
    this.runGeneralSubmit(recaptchaToken);
  }

  runGeneralSubmit = (recaptchaToken) => {
    
    // Form data for submission
    this.formDataToSubmit();

    // Run submit
    axios.post(
      '/api/catalog/users/firm/register?capchaInfo=' + recaptchaToken,
      this.state.dataToSubmit
    ).then(response => {
      this.hideLoader();
      this.handleGeneralSubmitResult(response);
      this.recaptchaRef.current.reset();
    }).catch(error => {
      console.log(error);
      this.recaptchaRef.current.reset();
      alert(localization.errorSubmit[lang]);
    });
  }

  // Handle General Submit Errors
  handleGeneralSubmitResult = (response) => {
    const status = response.data.status;
    if (
      status === 1 ||
      status === 2 ||
      status === 6
    ) {
      this.hideLoader();
      alert(localization.errorSubmit[lang]);
    } else if (status === 5) {
      this.hideLoader();
      alert(localization.errorSubmitAlreadyAssigned[lang]);
    } else if (status === 3 || status === 4) {
      this.hideLoader();
      if (this.state.hasLigaID) {
        alert(localization.errorSubmitWrongLigaId[lang]);
      } else {
        alert(localization.errorSubmitLigaIdAlreadyExist[lang]);
      }
    } else if (status === 0) {
      this.hideLoader();
      this.switchStep(4);
    }
  }

  render() {
    const siteKey = this.state.siteKey;
    let recaptcha = '';
    
    if (siteKey !== undefined) {
      recaptcha =
        <ReCAPTCHA
          ref={this.recaptchaRef}
          size="invisible"
          sitekey={siteKey}
          onChange={this.getRecaptchaToken}
          onErrored={() => console.log('Recaptcha error')}
        />
    }

    const loaderScreen = (
      <div className={style.loaderScreen}>
        <div className={style.loader}></div>
      </div>
    );

    return (
      <div className={style.App}>
        <div className={style.breadcrumbsBlock}>
          <a href={localization.breadcrumbsCatalogLink[lang]}>{localization.breadcrumbsCatalog[lang]}</a> / <span>{localization.stepTitleRegistration[lang]}</span>
        </div>

        <ReactResizeDetector handleWidth handleHeight onResize={() => {this.showWizard(this.state.activeStep)}} />

        {this.showStepView()}

        {this.state.loaderIsShown ? loaderScreen : ''}

        {recaptcha}

      </div>
    );
  }
}

export default App;