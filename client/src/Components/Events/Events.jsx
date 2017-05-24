<<<<<<< HEAD
import React, { Component } from 'react';
import css from './events.css';
import MenuBar from '../MenuBar/MenuBar.jsx';

class Events extends Component {
  render() {
    return (
      <div>
        <MenuBar />
        <h1>Events</h1>


        <article>

          <section>
            <h6>Event Name</h6>
            <br />

          </section>

          <section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquid reprehenderit expedita odio beatae est.</p>
          </section>

          <section>
            <p>Lorem ipsum dolor sit amet, consectetur.</p>
          </section>

          <section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quaerat suscipit ad.</p>
          </section>

          <section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem nihil alias amet dolores fuga totam sequi a cupiditate ipsa voluptas id facilis nobis.</p>
          </section>


          <section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem ut debitis dolorum earum expedita eveniet voluptatem quibusdam facere eos numquam commodi ad iusto laboriosam rerum aliquam.</p>
          </section>

          <section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </section>

          <section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat  architecto quis tenetur fugiat veniam iste molestiae fuga labore!</p>
          </section>

          <section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit accusamus tempore at porro officia rerum est impedit ea ipsa tenetur. Labore libero hic error sunt laborum expedita.</p>
          </section>

          <section>
            <p>Lorem ipsum dolor sit.</p>
          </section>

          <section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima asperiores eveniet vero velit eligendi aliquid in.</p>
          </section>

          <section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus dolorem maxime minima animi cum.</p>
          </section>

        </article>
      </div>
    );
  }
}
export default Events;
=======
import React from 'react';
import { render } from 'react-dom';
import css from './events.css';
import Event from '.././Event/event.jsx';
// import fetch from 'react-redux-fetch';
// import fetch from 'isomorphic-fetch';
// import es6 from 'es6-promise';

class Events extends React.Component {
  constructor(props){
    super(props);
    this.state={events: []};
  }


  componentDidMount(){
    fetch('/events?page=5').then((response) => {
      return response.json()
    }).then((parsedData)=> {

      this.setState({events : parsedData});
    })
  }
  render() {
    return (
      <div>
        <h1> Events </h1>
        <article> 
          {this.state.events.map((eventObject)=> (
            <Event title={"Title:" + eventObject.title} description={eventObject.description}/> 
          ))}   
        </article>
      </div>
    )
  }
}
export default Events;
// this.state.events ? "Title:" + this.state.events[0].title : "Title"
>>>>>>> v1.0/renderFakeEvents/getDataOnEventPage
