import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Container, Header, Grid, Divider, Modal, Card } from 'semantic-ui-react';
import { deleteEvent, updateAttendeeStatus, loginUser } from '../actions/actions';
import Event from '../components/Event';
import AttendeeContainer from '../containers/AttendeeContainer';

class UserEvents extends Component {

  constructor(props) {
    super(props);

    this.state = {
      creatorVisibile: true,
      modalFocus: undefined,
      modalFocusTag: 'Event',
      events: this.props.events,
      weather : []
    };

    this.filterClick = this.filterClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.changeModalFocusClick = this.changeModalFocusClick.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  componentWillMount = () => {
    this.props.loginUser();
  }

  filterClick = (flag) => {
    if (flag) this.setState({ creatorVisibile: true });
    else this.setState({ creatorVisibile: false });
  }

  changeModalFocusClick = (focusTag) => {
    this.setState({ modalFocusTag: focusTag });
  }

  deleteClick = event => this.props.deleteEvent(event);


  getWeather(){
    const { user } = this.props;
    console.log(user.events);
    let geoData =  user.events[0].lat + ',' + user.events[0].lng;
    // const weatherInfo = moment(user.events.date).format('X');
    

    // fetch('/events',{
    //   headers: {'Content-Type':'application/json'},
    //   method: "GET"
    // })
    // .then((response) => {return response.json(); })
    // .then((data) => { 
    //   let obj = {};
    //   console.log(data);
    //   obj.lat = data[0].lat;
    //   obj.lng = data[0].lng
    //   this.setState({ geoData : data.obj}) 
    //   console.log(this.state)
    //   });

    // fetch(`/api/weather?info=${weatherInfo}&loc=${location}`,{
    //   headers: {'Content-Type': 'application/json'},
    //   method: "GET",
    // })
    // .then(function(response){
      
    //   return response.json();
    // })
    // .then(function(data){
    //   const arr = [];
    //   arr.push(data.hourly.summary);
    //   arr.push(data.hourly.data[0].temperature);
    //   this.setState({weather : arr});
    //   console.log(data.hourly.summary);
    //   console.log(data.hourly.data[0].temperature);

    // })
  }

  render = () => {
    const { user } = this.props;
    const { creatorVisibile } = this.state;
    const filteredListLength = user.events.filter(event => creatorVisibile ? event.role === 'creator' : event.role !== 'creator').length;

    return (
      <Container className="userEvents-container">
        <Grid centered columns={4} textAlign="center">
          <Grid.Column >
            <Header as="h1" >
              Your Events
              {this.state.modalFocusTag}
              {this.state.modalFocusTag === 'Event'}
            </Header>
          </Grid.Column>
          <Grid.Row centered columns={6} verticalAlign="middle">
            <Button.Group>
              <Button
                active={creatorVisibile}
                content="Created Events"
                icon="user"
                onClick={() => this.filterClick(true)}
              />
              <Button.Or text="Or" />
              <Button
                active={!creatorVisibile}
                content="Joined Events"
                icon="users"
                onClick={() => this.filterClick(false)}
              />
            </Button.Group>
          </Grid.Row>
        </Grid>
        <Divider section />
        <Card.Group itemsPerRow={3} stackable className="grid-item">
          {filteredListLength === 0 ? (
         
            <h1>
              You are currently not signed up for any events. Add some events to your calendar <a href="/#/events">Here</a>
             
            </h1>
           
          ) : (
            user.events.filter(event => this.state.creatorVisibile ? event.role === 'creator' : event.role !== 'creator')
            .map((event) => {
              return (
                <Card centered key={event.id}>
                  <Card.Content>
                    <Card.Header>
                      {event.title}
                    </Card.Header>
                    <Card.Meta>
                      <span className="date">
                        Takes place {moment(event.date_time).calendar()}
                      </span>
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    <Modal
                      dimmer="blurring"
                      trigger={<Button  onClick={this.getWeather}>More info</Button>}
                      onClose={() => this.changeModalFocusClick('Event')}
                      basic
                      size="small"
                    >
                      {this.state.modalFocusTag === 'Event' ? (
                        <Event event={event} deleteClick={this.deleteClick} changeModalFocusClick={this.changeModalFocusClick} />
                      ) : (
                        <AttendeeContainer eventId={event.id} changeModalFocusClick={this.changeModalFocusClick} />
                      )}
                    </Modal>
                  </Card.Content>
                </Card>
              );
            }))}
        </Card.Group>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  {
    deleteEvent,
    updateAttendeeStatus,
    loginUser,
  },
)(UserEvents);
