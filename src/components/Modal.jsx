import '../../public/styles/modal.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
const OutlineModal = require('boron/OutlineModal');
import { Header, Container, Menu, Input, Grid, Button, Icon, Step, Rating } from 'semantic-ui-react';
import $ from 'jquery';
import { createEvent } from '../actions/actions';
import moment from 'moment';
import DatePicker from './DatePicker.jsx';
const steps = [
  { completed: false, active: true, title: 'Event Name', description: 'Name Your Event' },
  { completed: false, active: false, title: 'Event Time & Date', description: 'Set the Time and Date' },
  { completed: false, active: false, title: 'Event Location', description: 'Set the Location' },
  { completed: false, active: false, title: 'Looking For...', description: 'How Many People are You Looking For?' },
  { completed: false, active: false, title: 'Skill Rating', description: 'Specify a Skill Rating (If Applicable)' },
  { completed: false, active: false, title: 'Event Details', description: 'Additional Details' },
];

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventInfo: {
        date: '',
        title: '',
        skill_level: '',
        location: '',
        needs: '',
        description: '',
        dateFlag: false,
      },
      modalInfo: {
        headerText: 'Name Your Event',
        placeHolderText: 'Example: Co-Ed Soccer',
        previousButtonStatus: false,
        nextButtonStatus: true,
        modalNumber: 0,
      },
      m: moment(),
      modalToRender: '',
      history: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.cancelButtonClick = this.cancelButtonClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.submitClick = this.submitClick.bind(this);
  }

  showModal() {
    this.refs.modal.show();
    setTimeout(() => {
      $('button.next').prop('disabled', true);
      $('button.previous').prop('disabled', true);
    }, 100);
  }

  handleChange(event) {
    console.log(event.target.name);
    if(event.target.name === 'needs' && !event.target.value) {
      $('button.next').prop('disabled', true);
    }
    if(event.target.name !== 'needs' && event.target.value.length >= 5) {
      $('button.next').prop('disabled', false);
    }
    const key = event.target.name;
    this.state.eventInfo[key] = event.target.value;
  }
  
  handleDateChange(m) {
    this.state.m = m;
  }

  handleRate = (e, { rating }) => this.state.eventInfo.skill_level = rating;
  nextButtonClick() {
    console.log('next clicked');
    if(this.state.modalInfo.modalNumber === 0) {
          const modalTwo = {
            headerText: 'When is Your Event',
            placeHolderText: 'Date / Time',
            previousButtonStatus: true,
            nextButtonStatus: true,
            modalNumber: 1,
          };
          setTimeout(() => {
            $('.modal-frame').addClass('animated slideOutRight');
            steps[0].completed = true;
            steps[0].active = false;
            steps[0].description = this.state.eventInfo.title;
            steps[1].active = true;
            console.log('Going Forwards:', steps[0]);
          setTimeout(() => {
            this.setState({
              eventInfo: this.state.eventInfo,
              modalInfo: modalTwo,
              m: this.state.m,
              modalToRender: <DatePicker />,
            });
            $('.modal-frame').removeClass('animated slideOutRight').addClass('animated slideInLeft');
            $('button.previous').prop('disabled', false);
          }, 250);
        }, 250);
      } else if (this.state.modalInfo.modalNumber === 1) {
        console.log(this.state.modalInfo);
        const modalThree = {
          headerText: 'Where is Your Event?',
          placeHolderText: "Duncan's Apartment",
          previousButtonStatus: true,
          nextButtonStatus: true,
          modalNumber: 2,
        };
        setTimeout(() => {
          $('.modal-frame').addClass('animated slideOutRight');
          let dateTime = $('.dateTime').val();
          dateTime = moment(dateTime).format();
          this.state.eventInfo.date = dateTime;
          steps[1].completed = true;
          steps[1].active = false;
          steps[1].description = $('.dateTime').val();
          steps[2].active = true;
          this.setState({
              eventInfo: this.state.eventInfo,
              modalInfo: modalThree,
              m: this.state.m,
          });
          setTimeout(() => {
            this.setState({
              modalToRender: <Input focus name="location" type="text" placeholder={this.state.modalInfo.placeHolderText} size="huge" required onChange={this.handleChange} defaultValue={this.state.eventInfo.location} className="modalInput" />,
            });
            $('.modal-frame').removeClass('animated slideOutRight').addClass('animated slideInLeft');
            $('button.next').prop('disabled', true);
          }, 1000);
        }, 250);
      } else if (this.state.modalInfo.modalNumber === 2) {
          const modalThree = {
            headerText: 'Looking For...',
            placeHolderText: "Example: 2",
            previousButtonStatus: true,
            nextButtonStatus: true,
            modalNumber: 3,
          };
          setTimeout(() => {
            $('.modal-frame').addClass('animated slideOutRight');
            steps[2].completed = true;
            steps[2].active = false;
            steps[2].description = this.state.eventInfo.location;
            steps[3].active = true;
            this.setState({
              eventInfo: this.state.eventInfo,
              modalInfo: modalThree,
              m: this.state.m,
            });
          setTimeout(() => {
            this.setState({
              modalToRender: <Input focus name="needs" type="number" placeholder={this.state.modalInfo.placeHolderText} size="huge" required defaultValue={this.state.eventInfo.needs} onChange={this.handleChange} className="modalInput" />,
            });
            $('.modal-frame').removeClass('animated slideOutRight').addClass('animated slideInLeft');
            $('button.next').prop('disabled', true);
          }, 1000);
        }, 250);
      } 
      else if (this.state.modalInfo.modalNumber === 3) {
          const modalFour = {
            headerText: 'Select a Required Skill Level',
            placeHolderText: "Example: Not a Duncan",
            previousButtonStatus: true,
            nextButtonStatus: true,
            modalNumber: 4,
          };
          setTimeout(() => {
            $('.modal-frame').addClass('animated slideOutRight');
            steps[3].completed = true;
            steps[3].active = false;
            if (Number(this.state.eventInfo.needs) === 1) {
              steps[3].description = this.state.eventInfo.needs + ' Person';
            } else {
              steps[3].description = this.state.eventInfo.needs + ' People';
            }
            steps[4].active = true;
            this.setState({
              eventInfo: this.state.eventInfo,
              modalInfo: modalFour,
              m: this.state.m,
            });
          setTimeout(() => {
            this.setState({
              modalToRender: <Rating name="skill_level" size="massive" maxRating={5} clearable onRate={this.handleRate} className="ratingStars" />,
            });
            $('.modal-frame').removeClass('animated slideOutRight').addClass('animated slideInLeft');
            $('button.next').prop('disabled', true);
          }, 1000);
        }, 250);
      } else if (this.state.modalInfo.modalNumber === 4) {
          const modalFive = {
            headerText: 'Additional Details',
            placeHolderText: "Bring a Towel!",
            previousButtonStatus: true,
            nextButtonStatus: true,
            modalNumber: 5,
          };
          setTimeout(() => {
            $('.modal-frame').addClass('animated slideOutRight');
            steps[4].completed = true;
            steps[4].active = false;
            steps[4].description = this.state.eventInfo.skill_level + ' Stars';
            steps[5].active = true;
            this.setState({
              eventInfo: this.state.eventInfo,
              modalInfo: modalThree,
              m: this.state.m,
            });
          setTimeout(() => {
            this.setState({
              modalToRender: <Input focus name="description" type="text" placeholder={this.state.modalInfo.placeHolderText} size="huge" required defaultValue={this.state.eventInfo.description} onChange={this.handleChange} className="modalInput" />,
            });
            $('button.next').css('display', 'none');
            $('button.submit').css('display', 'inline-block');
            $('.modal-frame').removeClass('animated slideOutRight').addClass('animated slideInLeft');
          }, 1000);
          }, 250);
      }
  }
  previousButtonClick() {
    let currentIndex = this.state.history[this.state.history.length - 2];
        console.log(currentIndex);
        this.setState({
          eventInfo: currentIndex.eventInfo,
          modalInfo: currentIndex.modalInfo,
          m: currentIndex.m,
          modalToRender: currentIndex.modalToRender,
          history: this.state.history,
        });

        console.log(this.state);
        setTimeout(() => {
          $('.modal-frame').removeClass('animated slideInLeft').addClass('animated slideOutLeft');
          steps[this.state.modalInfo.modalNumber + 1].completed = false;
          steps[this.state.modalInfo.modalNumber + 1].active = false;
          steps[this.state.modalInfo.modalNumber].active = true;
          setTimeout(() => {
            this.setState({
              eventInfo: this.state.eventInfo,
              modalInfo: this.state.modalInfo,
              m: this.state.m,
            });
            $('.modal-frame').removeClass('animated slideOutLeft').addClass('animated slideInRight');
          }, 1000);
        }, 250);
        // Push Event to Store
        // Reset to First Modal
        this.refs.modal.hide();
    }

  cancelButtonClick() {
    console.log('Cancel Button Clicked');
    console.log(this.props);
  }
  submitClick() {
    this.props.createEvent(this.state.eventInfo);
  }
  componentDidMount() {
    const dateOrForm = () => {
      if (this.state.modalInfo.modalNumber === 2) {
        this.setState({
          ...this.state,
          modalToRender: <DatePicker className="datePicker" />,
        });
      } else {
        this.setState({
          ...this.state,
          modalToRender: <Input focus name="title" type="text" placeholder={this.state.modalInfo.placeHolderText} size="huge" required defaultValue={this.state.eventInfo.title} onChange={this.handleChange} className="modalInput" />,
        });
      }
    };
    return dateOrForm();
  }
  render() {
    return (
      <div>
        <Menu.Item
          name="events"
          onClick={this.showModal}
        >
        Create an Event
        </Menu.Item>
        <OutlineModal ref="modal" className="modal-container">
          <Grid className="modal" centered stretched textAlign="center" verticalAlign="top">
            <Grid.Row centered className="progressBar">
              <Step.Group ordered items={steps} className="creationProgress" />
            </Grid.Row>
            <Container className="modal-frame">
              <Grid.Row centered>
                <Header as='h1'textAlign="center" className="modalHeader">{this.state.modalInfo.headerText}</Header>
              </Grid.Row>
              <Grid.Row centered>
                {this.state.modalToRender}
              </Grid.Row>
            </Container>
            <Grid.Row centered>
              <Button.Group fluid className="buttonGroup">
                <Button name="previous" className="previous" animated negative onClick={this.previousButtonClick}>
                  <Button.Content visible>Previous</Button.Content>
                  <Button.Content hidden>
                    <Icon name='left arrow' className="previous" />
                  </Button.Content>
                </Button>
                <Button name="next" className="next" animated positive onClick={this.nextButtonClick}>
                  <Button.Content visible>Next</Button.Content>
                  <Button.Content hidden>
                    <Icon name='right arrow' className="next" />
                  </Button.Content>
                </Button>
              </Button.Group>
            </Grid.Row>
            <Grid.Row centered>
              <Button.Group fluid className="buttonGroup">
                <Button name="cancel" animated negative onClick={this.cancelButtonClick}>
                  <Button.Content visible>Cancel</Button.Content>
                  <Button.Content hidden>
                    <Icon name="trash outline" />
                  </Button.Content>
                </Button>
                <Button className="submit" positive animated onClick={this.submitClick}>
                  <Button.Content visible>Submit</Button.Content>
                  <Button.Content hidden>
                    <Icon name="checkmark" />
                  </Button.Content>
                </Button>
              </Button.Group>
            </Grid.Row>
          </Grid>
        </OutlineModal>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const eventList = state.eventList;
  return {
    eventList,
  };
};

export default connect(mapStateToProps, {
  createEvent,
})(Modal);