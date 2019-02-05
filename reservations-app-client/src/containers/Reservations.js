import React, { Component } from "react";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import config from "../config";
import "./Reservations.css";

export default class Reservations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      reservations: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const reservations = await this.reservations();
      this.setState({ reservations });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  reservations() {
    return API.get("reservations", "/reservations");
  }

  renderReservationsList(reservations) {
    return [{}].concat(reservations).map(
      (reservation, i) =>
        i !== 0
          ? <div id="reservations-list">
               <ListGroupItem header={reservation.client_name.trim().split("\n")[0]}>
                    {"Created: " + new Date(reservation.createdAt).toLocaleString()}
                </ListGroupItem>
             </div>
          : <a href="/">Faça uma nova reserva</a>
      );
  }

  renderReservations() {
     return (
       <div class="reservations">
         <h2>suas reservas</h2>
         <ListGroup>
           {!this.state.isLoading && this.renderReservationsList(this.state.reservations)}
         </ListGroup>
       </div>
     );
   }

  render() {
    return(
      <div id="reservations">
        {this.renderReservations()}
      </div>
    );
  }
}
