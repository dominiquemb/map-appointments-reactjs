import React from 'react';
import PropTypes from 'prop-types';

export const DEFAULT_STATE = {
  currentStep: 1,
  totalSteps: 0,
};

export const SchedulerContext = React.createContext(DEFAULT_STATE);

class SchedulerProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = DEFAULT_STATE;

  getCurrentStep = () => {
    const { currentStep } = this.state;
    return currentStep;
  };

  getTotalSteps = () => {
    const { totalSteps } = this.state;
    return totalSteps;
  };

  setTotalSteps = (totalSteps) => {
    this.setState({ totalSteps });
  };

  next = () => {
    const getCurrent = prevState => (
      prevState.currentStep < prevState.totalSteps
        ? prevState.currentStep + 1 : prevState.totalSteps
    );
    this.setState(prevState => ({ currentStep: getCurrent(prevState) }));
  }

  back = () => {
    const getCurrent = prevState => (
      prevState.currentStep > 0
        ? prevState.currentStep - 1 : 0
    );
    this.setState(prevState => ({ currentStep: getCurrent(prevState) }));
  };

  restart = () => this.setState({ currentStep: 1 });

  render() {
    const { children } = this.props;
    return (
      <SchedulerContext.Provider
        value={{
          getCurrentStep: this.getCurrentStep,
          setTotalSteps: this.setTotalSteps,
          getTotalSteps: this.getTotalSteps,
          next: this.next,
          back: this.back,
          restart: this.restart,
        }}
      >
        {children}
      </SchedulerContext.Provider>
    );
  }
}

export default SchedulerProvider;
