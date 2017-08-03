import React from 'react'
import Forecast from '../components/Forecast'
import { getForcast } from '../helpers/api'
import PropTypes from 'prop-types'


class ForecastContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      forecastData: {}
    }
  }
  componentDidMount () {
    this.makeRequest(this.props.routeParams.city)
  }
  componentWillReceiveProps(nextProps) {
    this.makeRequest(nextProps.routeParams.city)
  }

  async makeRequest(city) {
    try {
      const forecastData = await getForcast(city)
      this.setState({
        isLoading: false,
        forecastData: forecastData
      })
    } catch (e) {
      console.warn("Error in ForecastContainer:", e)
    }
  }

  handleClick(weather) {
    console.log(this)
    this.context.router.push({
      pathname: '/detail/' + this.props.routeParams.city,
      state: {
        weather: weather
      }
    })
  }
  render() {
    const {isLoading, forecastData} = this.state
    return (
      <Forecast
        city={this.props.routeParams.city}
        isLoading={isLoading}
        handleClick={(weather) => this.handleClick(weather)}
        forecastData={forecastData} />
    )
  }
}

ForecastContainer.propTypes = {
  routeParams: PropTypes.object.isRequired
}

ForecastContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ForecastContainer
