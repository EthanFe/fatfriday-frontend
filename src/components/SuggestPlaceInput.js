import React, { Component } from 'react';
import {connect} from 'react-redux'
import Autocomplete from 'react-autocomplete'
import { autocompleteDropdownStyle } from './autocompleteStyle';
import { suggestPlace, changePlaceSearchText, clearPlaceSearchAutocompletes, requestPlaceAutocompletes } from '../actions';

class SuggestPlaceInput extends Component {
  render() {
    return (
      <div className="event-display-place-suggestion">
        <div className="invite-user-label">Suggest a Place</div>
        <Autocomplete
          getItemValue={(item) => item.placeName}
          items={this.props.placeSearchAutocompletes}
          renderItem={(item, isHighlighted) =>
            <div style={{background: isHighlighted ? 'lightgray' : 'white'}}>
              {item.placeName}
            </div>
          }
          value={this.props.placeSearchText}
          onChange={(event) => this.placeSearchTextChanged(event.target.value)}
          onSelect={(value, item) => this.props.suggestPlace(this.props.loggedInAs.token, this.props.loggedInAs.id, this.props.eventID, item.placeID, item.placeName)}
          shouldItemRender={() => true}
          menuStyle={autocompleteDropdownStyle}
        />
      </div>
    )
  }

  placeSearchTextChanged = (text) => {
    const autoCompleteBuildupTime = 250 //ms

    if (this.autoCompleteBuildupTimer !== null) {
      clearTimeout(this.autoCompleteBuildupTimer)
      this.autoCompleteBuildupTimer = null
    }
    if (text !== "") {
      this.autoCompleteBuildupTimer = setTimeout(() => {
        this.props.requestPlaceAutocompletes(this.props.loggedInAs.token, this.props.loggedInAs.id, text)
        this.autoCompleteBuildupTimer = null
      }, autoCompleteBuildupTime)
    } else {
      this.props.clearPlaceSearchAutocompletes()
    }

    this.props.changePlaceSearchText(text)
  }
}

const mapStateToProps = (state, props) => {
  return {
    loggedInAs: state.loggedInAs,
    placeSearchAutocompletes: state.placeSearchAutocompletes,
    placeSearchText: state.placeSearchText
  }
}

const mapActionsToProps = {
  changePlaceSearchText: changePlaceSearchText,
  requestPlaceAutocompletes: requestPlaceAutocompletes,
  suggestPlace: suggestPlace,
  clearPlaceSearchAutocompletes: clearPlaceSearchAutocompletes
}

export default connect(mapStateToProps, mapActionsToProps)(SuggestPlaceInput);