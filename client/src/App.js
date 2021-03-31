import './App.css';
import React, {Component} from 'react';
import LineChart from './components/lineChart';

export default class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      chartData : {}
    }
    this.timer = null;
    this.fetchData = this.fetchData.bind(this);
    this.title = "Mem Monitor";
  }
  componentDidMount(){
    this.fetchData();
    this.timer = setInterval( this.fetchData , 5*1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  fetchData = () => {
    const response = fetch("/get/resource/memory");
    response.then( r => r.json()).then( r => {
      this.setState({
        chartData : {
          labels: r.map( e => { 
            return new Date(e.date_time).toISOString();
           }),
          datasets: [
            {
              label: 'Memory usage',
              data: r.map( e => {return e.mem}), //[12, 19, 3, 5, 2, 3],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ],
        }
      });
    });
  }
  
  render(){
    const { chartData } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <LineChart data={chartData} title={this.title}></LineChart>
          
        </header>
      </div>
    );
  }
}
