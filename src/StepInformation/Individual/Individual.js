import React, { Component } from 'react';
import style from './Individual.less';
import FileBase64 from 'react-file-base64';
import axios from 'axios';

import TextInput from '../../Form/TextInput';
// import Radio from '../../Form/Radio';
import Checkbox from '../../Form/Checkbox';
import Select from '../../Form/Select';

const lang = document.getElementsByTagName('body')[0].getAttribute('lang');

class Individual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        individualTypes: [],
        addressData: [],
        regions: [],
        cities: [],
        districts: [],
        streetTypes: []
      }
    };

    this.imageInput = React.createRef();
    this.getCities = this.getCities.bind(this);
  }

  componentDidMount() {

    // Alter the nested input 
    let inputElem = this.imageInput.current.querySelector('input');
    inputElem.setAttribute('id', 'individualPhoto');
    inputElem.setAttribute('data-stat', 'jurliga-catalog-registryform_se-photo-upload-1'); // for web stat

    // Get Individual Types
    let individualTypesArr = [];
    axios.get('/api/catalog/dictionary/types?lang=' + lang)
      .then(response => {
        response.data.map(item => {
          if (item.isFLP) {
            individualTypesArr.push({value: item.ID, name: item.Name})
          }
        })

        this.setState(prevState => ({
          data: {
            ...prevState.data,
            individualTypes: individualTypesArr
          }   
        }));
      });

    // Get Address Data
    axios.get('/api/catalog/dictionary/adddress/tree?lang=' + lang)
      .then(response => {
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            addressData: response.data
          }   
        }),
        () => {

          // Add Regions to the State
          this.state.data.addressData.map(item => {
            this.setState(prevState => ({
              data: {
                ...prevState.data,
                regions: [...prevState.data.regions,
                  {value: item.Id, name: item.Name}]
              } 
          }));

          if (this.props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value !== '') {
            this.getCities(this.props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value);
          }

        })
      })
    });

    // Get Street Types
    axios.get('/api/catalog/dictionary/streetTypes?lang=' + lang)
      .then(response => {
        response.data.map(item => {
          this.setState(prevState => ({
            data: {
              ...prevState.data,
              streetTypes: [...prevState.data.streetTypes,
                {value: item.Key, name: item.Value}]
            }   
          }));
        });
      });
  }

  // Get Cities from the picked Region and put them to the State
  getCities = regionId => {
    let citiesArr = [];
    this.state.data.addressData.map(region => {
      if (region.Id === +regionId) {
        region.addresses.map(city => {
          citiesArr.push({value: city.Id, name: city.Name})
        });
      }
    });
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        cities: citiesArr
      } 
    }),
    () => {
      if (this.props.inputData.dataStepInformation.dataIndividual.individualAddressCity.value !== 0) {
        this.getDistricts(this.props.inputData.dataStepInformation.dataIndividual.individualAddressCity.value, 'stepInformation-individual');
      }
    });
  }

  // Get Districts from the picked City and put them to the State
  getDistricts = (cityId, section) => {
    let districtsArr = [];
    this.state.data.addressData.map(region => {
      region.addresses.map(city => {
        if (city.Id === +cityId) {
          city.addresses.map(district => {
            districtsArr.push({value: district.Id, name: district.Name})
          });
        }
      });
    });
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        districts: districtsArr
      } 
    }));

    if (districtsArr.length !== 0 && this.props.inputData.dataStepInformation.dataIndividual.individualAddressDistrict.value === 0) {
      this.props.setDistrictFieldValidity(section, false);
    } else {
      this.props.setDistrictFieldValidity(section, true);
    }
  }

  render() {
    const section = 'stepInformation-individual';
    return (
      <form className={`${style.Individual} ${style.form}`}>
        <div className={style.contentBlock}>
          <div className={style.leftColumn}>
            
            <fieldset>
              <div className={style.formSubtitle}>{this.props.localize('formSectionIndividualInformation')}</div>
              <div className={`${style.nameBlock} ${style.row}`}>

                <TextInput
                  type="text"
                  name="individualLastName"
                  data-stat="jurliga-catalog-registryform_se-sname-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataIndividual.individualLastName.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataIndividual.individualLastName.focused}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualLastName.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualLastName.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualLastName.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualLastName.errorMessage}
                />

                <TextInput
                  type="text"
                  name="individualFistName"
                  data-stat="jurliga-catalog-registryform_se-fname-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataIndividual.individualFistName.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataIndividual.individualFistName.focused}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualFistName.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualFistName.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualFistName.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualFistName.errorMessage}
                />

                <TextInput
                  type="text"
                  name="individualPatronymicName"
                  data-stat="jurliga-catalog-registryform_se-tname-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataIndividual.individualPatronymicName.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataIndividual.individualPatronymicName.focused}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualPatronymicName.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualPatronymicName.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualPatronymicName.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualPatronymicName.errorMessage}
                />
              </div>

              <div className={style.individualTypeBlock}>
                <Select
                  name="individualType"
                  data-stat="jurliga-catalog-registryform_se-career-selection-1"
                  selectClass={this.props.inputData.dataStepInformation.dataIndividual.individualType.value === 0 ? 'notChosen' : ''}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualType.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  placeholder={this.props.inputData.dataStepInformation.dataIndividual.individualType.placeholderText}
                  options={this.state.data.individualTypes}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualType.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualType.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualType.errorMessage}
                />
              </div>

              <div className={style.licenseBlock}>

                <Checkbox
                  name="individualLicenseCheck"
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseCheck.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  inputData={this.props.inputData}
                  labelText={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseCheck.labelText}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseCheck.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseCheck.valid}
                />

                <TextInput
                  type="text"
                  name="individualLicenseLink"
                  placeholderText={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseLink.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseLink.focused}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseLink.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseLink.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseLink.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseLink.errorMessage}
                  disabled={this.props.inputData.dataStepInformation.dataIndividual.individualLicenseCheck.value ? false : true}
                />
              </div>
            </fieldset>

            <fieldset>
              <div className={style.formSubtitle}>{this.props.localize('formSectionIndividualContacts')}</div>
              <div className={`${style.contactsBlock} ${style.row}`}>

                <TextInput
                  type="tel"
                  name="individualTelephone"
                  data-stat="jurliga-catalog-registryform_se-phone-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataIndividual.individualTelephone.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataIndividual.individualTelephone.focused}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualTelephone.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualTelephone.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualTelephone.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualTelephone.errorMessage}
                />

                <TextInput
                  type="email"
                  name="individualEmail"
                  data-stat="jurliga-catalog-registryform_se-email-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataIndividual.individualEmail.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataIndividual.individualEmail.focused}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualEmail.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualEmail.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualEmail.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualEmail.errorMessage}
                />
              </div>
            </fieldset>

            <fieldset>
              <div className={style.formSubtitle}>{this.props.localize('formSectionAddress')}</div>
              <div className={style.row}>

                <Select
                  name="individualAddressRegion"
                  data-stat="jurliga-catalog-registryform_se-area-selection-1"
                  selectClass={this.props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value === 0 ? 'notChosen' : ''}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value}
                  onChange={e => {
                    this.props.inputChangeHandler(e, section);
                    this.getCities(e.target.value);
                  }}
                  placeholder={this.props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.placeholderText}
                  options={this.state.data.regions}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.errorMessage}
                />

                <Select
                  name="individualAddressCity"
                  data-stat="jurliga-catalog-registryform_se-city-input-1"
                  selectClass={this.props.inputData.dataStepInformation.dataIndividual.individualAddressCity.value === 0 ? 'style.notChosen' : ''}
                  disabled={this.props.inputData.dataStepInformation.dataIndividual.individualAddressRegion.value === 0 ? true : false}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualAddressCity.value}
                  onChange={e => {
                    this.props.inputChangeHandler(e, section);
                    this.getDistricts(e.target.value, section);
                  }}
                  placeholder={this.props.inputData.dataStepInformation.dataIndividual.individualAddressCity.placeholderText}
                  options={this.state.data.cities}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualAddressCity.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualAddressCity.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualAddressCity.errorMessage}
                />
              </div>

              <div className={`${style.districtBlock} ${style.row}`}>
                <Select
                  name="individualAddressDistrict"
                  data-stat="jurliga-catalog-registryform_se-region-input-1"
                  selectClass={this.props.inputData.dataStepInformation.dataIndividual.individualAddressDistrict.value === 0 ? 'style.notChosen' : ''}
                  disabled={this.props.inputData.dataStepInformation.dataIndividual.individualAddressCity.value === 0 || this.state.data.districts.length === 0 ? true : false}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualAddressDistrict.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  placeholder={this.props.inputData.dataStepInformation.dataIndividual.individualAddressDistrict.placeholderText}
                  options={this.state.data.districts}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualAddressDistrict.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualAddressDistrict.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualAddressDistrict.errorMessage}
                />
              </div>
              <div className={style.addressBlock}>

                <Select
                  name="individualAddressStreetPrefix"
                  selectClass={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreetPrefix.value === 0 ? 'notChosen' : ''}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreetPrefix.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  placeholder={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreetPrefix.placeholderText}
                  options={this.state.data.streetTypes}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreetPrefix.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreetPrefix.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreetPrefix.errorMessage}
                />

                <TextInput
                  type="text"
                  name="individualAddressStreet"
                  data-stat="jurliga-catalog-registryform_se-address-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreet.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreet.focused}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreet.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreet.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreet.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualAddressStreet.errorMessage}
                />

                <TextInput
                  type="text"
                  name="individualAddressBuilding"
                  data-stat="jurliga-catalog-registryform_se-building-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataIndividual.individualAddressBuilding.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataIndividual.individualAddressBuilding.focused}
                  value={this.props.inputData.dataStepInformation.dataIndividual.individualAddressBuilding.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataIndividual.individualAddressBuilding.touched}
                  valid={this.props.inputData.dataStepInformation.dataIndividual.individualAddressBuilding.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataIndividual.individualAddressBuilding.errorMessage}
                />
              </div>
            </fieldset>
          </div>

          <div className={style.rightColumn}>
            <div className={style.addImageBtn}>
              <label
                for="individualPhoto"
                ref={this.imageInput}>
                <FileBase64
                  multiple={false}
                  onDone={file => this.props.addImageData(file, section)} />
              </label>
              <i class="fa fa-camera" aria-hidden="true"></i>
              <span>{this.props.localize('addPhotoBtn')}</span>
            </div>
            <div className={`${style.imageFrame} ${style.round}`}>
              <div
                className={style.image}
                style={{ backgroundImage: `url(${this.props.inputData.dataStepInformation.dataIndividual.individualPhoto.value})` }}
              ></div>
            </div>
          </div>
        </div>

        <input
          className={
            `${style.submitBtn}
            ${!this.props.formIndividualIsValid ? style.nonActive : ''}`
          }
          data-stat="jurliga-catalog-registryform_se-next_step1-button-1"
          type="submit"
          value={this.props.localize('continueBtn')}
          onClick={e => this.props.handleStepSubmit(e, 2)}
        />
      </form>
    )
  }
}

export default Individual;