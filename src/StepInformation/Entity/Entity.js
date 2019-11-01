import React, { Component } from 'react';
import style from './Entity.less';
import FileBase64 from 'react-file-base64';
import axios from 'axios';

import TextInput from '../../Form/TextInput';
import Select from '../../Form/Select';

const lang = document.getElementsByTagName('body')[0].getAttribute('lang');

class Entity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        companyTypes: [],
        companyEmployeesNum: [
          {value: 1, name: '1-10'},
          {value: 2, name: '11-20'},
          {value: 3, name: '21-30'},
          {value: 4, name: '31-40'},
          {value: 5, name: '41-50'},
          {value: 6, name: '51-100'},
          {value: 7, name: '>100'}
        ],
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
    inputElem.setAttribute('id', 'companyLogo');
    inputElem.setAttribute('data-stat', 'jurliga-catalog-registryform_ce-photo-upload-1'); // for web stat

    // Get Company Types
    let companyTypesArr = [];
    axios.get('/api/catalog/dictionary/types?lang=' + lang)
      .then(response => {
        response.data.map(item => {
          if (!item.isFLP) {
            companyTypesArr.push({value: item.ID, name: item.Name})
          }
        })

        this.setState(prevState => ({
          data: {
            ...prevState.data,
            companyTypes: companyTypesArr
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

          if (this.props.inputData.dataStepInformation.dataEntity.companyAddressRegion.value !== '') {
            this.getCities(this.props.inputData.dataStepInformation.dataEntity.companyAddressRegion.value);
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
  getCities = (regionId) => {
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
      if (this.props.inputData.dataStepInformation.dataEntity.companyAddressCity.value !== 0) {
        this.getDistricts(this.props.inputData.dataStepInformation.dataEntity.companyAddressCity.value, 'stepInformation-entity');
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

    if (districtsArr.length !== 0 && this.props.inputData.dataStepInformation.dataEntity.companyAddressDistrict.value === 0) {
      this.props.setDistrictFieldValidity(section, false);
    } else {
      this.props.setDistrictFieldValidity(section, true);
    }
  }

  render() {
    const section = 'stepInformation-entity';
    return (
      <form className={`${style.Entity} ${style.form}`}>
        <div className={style.contentBlock}>
          <div className={style.leftColumn}>

            <fieldset className={style.companyInfoSection}>
              <div className={style.formSubtitle}>{this.props.localize('formSectionCompanyInformation')}</div>
              <div className={style.row}>

                <TextInput
                  type="text"
                  name="companyName"
                  data-stat="jurliga-catalog-registryform_ce-cname-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataEntity.companyName.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataEntity.companyName.focused}
                  value={this.props.inputData.dataStepInformation.dataEntity.companyName.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataEntity.companyName.touched}
                  valid={this.props.inputData.dataStepInformation.dataEntity.companyName.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataEntity.companyName.errorMessage}
                />

                <Select
                  name="companyType"
                  data-stat="jurliga-catalog-registryform_ce-ctype-input-1"
                  selectClass={this.props.inputData.dataStepInformation.dataEntity.companyType.value === 0 ? 'notChosen' : ''}
                  value={this.props.inputData.dataStepInformation.dataEntity.companyType.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  placeholder={this.props.inputData.dataStepInformation.dataEntity.companyType.placeholderText}
                  options={this.state.data.companyTypes}
                  touched={this.props.inputData.dataStepInformation.dataEntity.companyType.touched}
                  valid={this.props.inputData.dataStepInformation.dataEntity.companyType.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataEntity.companyType.errorMessage}
                />
              </div>

              <Select
                name="companyEmployeesNum"
                data-stat="jurliga-catalog-registryform_ce-cecount-input-1"
                selectClass={this.props.inputData.dataStepInformation.dataEntity.companyEmployeesNum.value === 0 ? 'notChosen' : ''}
                value={this.props.inputData.dataStepInformation.dataEntity.companyEmployeesNum.value}
                onChange={e => this.props.inputChangeHandler(e, section)}
                placeholder={this.props.inputData.dataStepInformation.dataEntity.companyEmployeesNum.placeholderText}
                options={this.state.data.companyEmployeesNum}
                touched={this.props.inputData.dataStepInformation.dataEntity.companyEmployeesNum.touched}
                valid={this.props.inputData.dataStepInformation.dataEntity.companyEmployeesNum.valid}
                errMsg={this.props.inputData.dataStepInformation.dataEntity.companyEmployeesNum.errorMessage}
              />
            </fieldset>

            <fieldset className={style.contactPersonSection}>
              <div className={style.formSubtitle}>{this.props.localize('formSectionCompanyContacts')}</div>
              <div className={style.row}>

                <TextInput
                  type="email"
                  name="contactPersonEmail"
                  data-stat="jurliga-catalog-registryform_ce-email-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataEntity.contactPersonEmail.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataEntity.contactPersonEmail.focused}
                  value={this.props.inputData.dataStepInformation.dataEntity.contactPersonEmail.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataEntity.contactPersonEmail.touched}
                  valid={this.props.inputData.dataStepInformation.dataEntity.contactPersonEmail.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataEntity.contactPersonEmail.errorMessage}
                />

                <TextInput
                  type="tel"
                  name="contactPersonTelephone"
                  data-stat="jurliga-catalog-registryform_ce-phone-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataEntity.contactPersonTelephone.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataEntity.contactPersonTelephone.focused}
                  value={this.props.inputData.dataStepInformation.dataEntity.contactPersonTelephone.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataEntity.contactPersonTelephone.touched}
                  valid={this.props.inputData.dataStepInformation.dataEntity.contactPersonTelephone.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataEntity.contactPersonTelephone.errorMessage}
                />
              </div>
            </fieldset>

            <fieldset>
              <div className={style.formSubtitle}>{this.props.localize('formSectionAddress')}</div>
              <div className={style.row}>

                <Select
                  name="companyAddressRegion"
                  data-stat="jurliga-catalog-registryform_ce-area-selection-1"
                  selectClass={this.props.inputData.dataStepInformation.dataEntity.companyAddressRegion.value === 0 ? 'notChosen' : ''}
                  value={this.props.inputData.dataStepInformation.dataEntity.companyAddressRegion.value}
                  onChange={e => {
                    this.props.inputChangeHandler(e, section),
                    this.getCities(e.target.value)
                  }}
                  placeholder={this.props.inputData.dataStepInformation.dataEntity.companyAddressRegion.placeholderText}
                  options={this.state.data.regions}
                  touched={this.props.inputData.dataStepInformation.dataEntity.companyAddressRegion.touched}
                  valid={this.props.inputData.dataStepInformation.dataEntity.companyAddressRegion.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataEntity.companyAddressRegion.errorMessage}
                />

                <Select
                  name="companyAddressCity"
                  data-stat="jurliga-catalog-registryform_ce-city-input-1"
                  selectClass={this.props.inputData.dataStepInformation.dataEntity.companyAddressCity.value === 0 ? 'notChosen' : ''}
                  disabled={this.props.inputData.dataStepInformation.dataEntity.companyAddressRegion.value === 0 ? true : false}
                  value={this.props.inputData.dataStepInformation.dataEntity.companyAddressCity.value}
                  onChange={e => {
                    this.props.inputChangeHandler(e, section);
                    this.getDistricts(e.target.value, section);
                  }}
                  placeholder={this.props.inputData.dataStepInformation.dataEntity.companyAddressCity.placeholderText}
                  options={this.state.data.cities}
                  touched={this.props.inputData.dataStepInformation.dataEntity.companyAddressCity.touched}
                  valid={this.props.inputData.dataStepInformation.dataEntity.companyAddressCity.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataEntity.companyAddressCity.errorMessage}
                />
              </div>
              
              <div className={`${style.districtBlock} ${style.row}`}>
                <Select
                  name="companyAddressDistrict"
                  data-stat="jurliga-catalog-registryform_ce-region-input-1"
                  selectClass={this.props.inputData.dataStepInformation.dataEntity.companyAddressDistrict.value === 0 ? 'style.notChosen' : ''}
                  disabled={this.props.inputData.dataStepInformation.dataEntity.companyAddressCity.value === 0 || this.state.data.districts.length === 0 ? true : false}
                  value={this.props.inputData.dataStepInformation.dataEntity.companyAddressDistrict.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  placeholder={this.props.inputData.dataStepInformation.dataEntity.companyAddressDistrict.placeholderText}
                  options={this.state.data.districts}
                  touched={this.props.inputData.dataStepInformation.dataEntity.companyAddressDistrict.touched}
                  valid={this.props.inputData.dataStepInformation.dataEntity.companyAddressDistrict.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataEntity.companyAddressDistrict.errorMessage}
                />
              </div>
              <div className={style.addressBlock}>

                <Select
                  name="companyAddressStreetPrefix"
                  selectClass={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreetPrefix.value === 0 ? 'notChosen' : ''}
                  value={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreetPrefix.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  placeholder={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreetPrefix.placeholderText}
                  options={this.state.data.streetTypes}
                  touched={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreetPrefix.touched}
                  valid={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreetPrefix.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreetPrefix.errorMessage}
                />

                <TextInput
                  type="text"
                  name="companyAddressStreet"
                  data-stat="jurliga-catalog-registryform_ce-address-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreet.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreet.focused}
                  value={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreet.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreet.touched}
                  valid={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreet.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataEntity.companyAddressStreet.errorMessage}
                />

                <TextInput
                  type="text"
                  name="companyAddressBuilding"
                  data-stat="jurliga-catalog-registryform_ce-building-input-1"
                  placeholderText={this.props.inputData.dataStepInformation.dataEntity.companyAddressBuilding.placeholderText}
                  onFocus={e => this.props.inputFocusHandler(e, true, section)}
                  onBlur={e => this.props.inputFocusHandler(e, false, section)}
                  focused={this.props.inputData.dataStepInformation.dataEntity.companyAddressBuilding.focused}
                  value={this.props.inputData.dataStepInformation.dataEntity.companyAddressBuilding.value}
                  onChange={e => this.props.inputChangeHandler(e, section)}
                  touched={this.props.inputData.dataStepInformation.dataEntity.companyAddressBuilding.touched}
                  valid={this.props.inputData.dataStepInformation.dataEntity.companyAddressBuilding.valid}
                  errMsg={this.props.inputData.dataStepInformation.dataEntity.companyAddressBuilding.errorMessage}
                />
              </div>
            </fieldset>
          </div>

          <div className={style.rightColumn}>
            <div className={style.addImageBtn}>
              <label
                for="companyLogo"
                ref={this.imageInput}>
                <FileBase64
                  multiple={false}
                  onDone={file => this.props.addImageData(file, section)} />
              </label>
              
              <i class="fa fa-camera" aria-hidden="true"></i>
              <span>{this.props.localize('addLogoBtn')}</span>
            </div>
            <div className={style.imageFrame}>
              <div
                className={style.image}
                style={{ backgroundImage: `url(${this.props.inputData.dataStepInformation.dataEntity.companyLogo.value})` }}
              ></div>
            </div>
          </div>
        </div>

        <input
          className={
            `${style.submitBtn}
            ${!this.props.formEntityIsValid ? style.nonActive : ''}`
          }
          data-stat="jurliga-catalog-registryform_ce-next_step1-button-1"
          type="submit"
          value={this.props.localize('continueBtn')}
          onClick={e => this.props.handleStepSubmit(e, 2)}
        />
      </form>
    )
  }
}

export default Entity;