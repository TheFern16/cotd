import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import SampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
  constructor() {
    super()
    this.addFish = this.addFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    this.state = {
      fishes: {},
      order: {}
    };
  };

  componentWillMount() {
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  };

  addFish(fish) {
    const fishes = {...this.state.fishes};
    const timeStamp = Date.now();
    fishes[`fish-${timeStamp}`] = fish;
    this.setState( { fishes });
  };

  updateFish(key, updateFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updateFish;
    this.setState({ fishes });
  };

  removeFish(key) {
    const fishes = {...this.state.fishes}
    fishes[key] = null;
    this.setState( { fishes });
  }

  loadSamples() {
    this.setState({
      fishes: SampleFishes
    });
  };

  addToOrder(key) {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  };


  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
            <ul className="list-of-fishes">
              {
                Object
                  .keys(this.state.fishes)
                  .map(key => <Fish key={key} index={key} details={this.state.fishes[key]}addToOrder={this.addToOrder}
                      />)
              }
            </ul>
        </div>
          <Order
            fishes={this.state.fishes}
            order={this.state.order}
            params={this.props.params}
            removeFromOrder={this.removeFromOrder}
          />
          <Inventory
            addFish={this.addFish}
            removeFish={this.removeFish}
            loadSamples={this.loadSamples}
            fishes={this.state.fishes}
            updateFish={this.updateFish}
          />
      </div>
    )
  }
};

App.propTypes = {
  location: React.PropTypes.object,
  storeId: React.PropTypes.string,
  params: React.PropTypes.object
}

export default App;