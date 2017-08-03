import React from 'react'
import PropTypes from 'prop-types'
import GetCity from '../components/GetCity'

class GetCityContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: ''
    }
  }

  handleSubmitCity(e) {
    e.preventDefault()
    this.context.router.push('/forecast/' + this.state.city)
  }

  handleUpdateCity(e) {
    this.setState({
      city: e.target.value
    })
  }

  render() {
    return (
      <GetCity
        direction={this.props.direction}
        onSubmitCity={(e) => this.handleSubmitCity(e)}
        onUpdateCity={(e) => this.handleUpdateCity(e)}
        city={this.state.city} />
    )
  }
}

GetCityContainer.defaultProps = {
  direction: 'column'
}

GetCityContainer.propTypes = {
  direction: PropTypes.string
}

GetCityContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default GetCityContainer
