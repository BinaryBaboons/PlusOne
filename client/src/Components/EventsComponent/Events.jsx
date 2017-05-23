import React from 'react';
import { render } from 'react-dom';
import css from './events.css';
// import fetch from 'react-redux-fetch'

import fetch from 'isomorphic-fetch';
import es6 from 'es6-promise';

class Events extends React.Component {
  constructor(props){
    super(props);
    this.state={ };
  }


  componentDidMount(){
    fetch('/events').then((response) => {
      // console.log(response.json());

      return response.json()
    }).then((parsedData)=>{
      this.setState({events : parsedData});
    })
  }

  render() {
    return (
      <div>
        <h1> Events </h1>
        <article>
        this.state.events.map((eventObjects)=>{
        <section>{eventObjects.title}<br/> {eventObjects.description}</section>
        })
          // <section>
          //   <h3>{this.state.eventName}</h3>
          //   <p>{this.state.description}</p>
          //   <p>{this.state.skill}</p>
          // </section>

          // <section>
          //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquid reprehenderit expedita odio beatae est.</p>
          // </section>

          // <section>
          //   <p>Lorem ipsum dolor sit amet, consectetur.</p>
          // </section>

          // <section>
          //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quaerat suscipit ad.</p>
          // </section>

          // <section>
          //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem nihil alias amet dolores fuga totam sequi a cupiditate ipsa voluptas id facilis nobis.</p>
          // </section>


          // <section>
          //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem ut debitis dolorum earum expedita eveniet voluptatem quibusdam facere eos numquam commodi ad iusto laboriosam rerum aliquam.</p>
          // </section>

          // <section>
          //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          // </section>

          // <section>
          //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat  architecto quis tenetur fugiat veniam iste molestiae fuga labore!</p>
          // </section>

          // <section>
          //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit accusamus tempore at porro officia rerum est impedit ea ipsa tenetur. Labore libero hic error sunt laborum expedita.</p>
          // </section>

          // <section>
          //   <p>Lorem ipsum dolor sit.</p>
          // </section>

          // <section>
          //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima asperiores eveniet vero velit eligendi aliquid in.</p>
          // </section>

          // <section>
          //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus dolorem maxime minima animi cum.</p>
          // </section>

        </article>
      </div>
    )
  }
}
export default Events