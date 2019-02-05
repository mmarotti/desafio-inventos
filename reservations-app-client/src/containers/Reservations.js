import React, { Component } from "react";
import { API } from "aws-amplify";
import { ListGroup, ListGroupItem, Glyphicon } from "react-bootstrap";
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
               <ListGroupItem header={"Minion #" + reservation.minion + " - " + reservation.client_name.trim() + " - " + reservation.email.trim()}>
                    {"Reservado em: " + new Date(reservation.createdAt).toLocaleString('pt-br')}
                </ListGroupItem>
             </div>
          : <a href="/#contact">Faça uma nova reserva</a>
      );
  }

  renderReservations() {
    if(this.state.isLoading){
      return (
        <div class="reservations">
          <Glyphicon glyph="refresh" />
        </div>
      );
    } else if(this.state.reservations.length !== 0 && !this.state.isLoading){
       return (
         <div class="reservations">
           <h2>suas reservas</h2>
             <ListGroup>
               {!this.state.isLoading && this.renderReservationsList(this.state.reservations)}
             </ListGroup>
         </div>
       );
     } else if(!this.state.isLoading){
       return (
         <div class="reservations empty">
           <h2>Você ainda não possui reservas =( </h2>
           <a href="/#contact">Faça uma nova reserva</a>
         </div>
       );
     }
   }

  render() {
    return(
      <div id="reservations">
        {this.renderReservations()}
      </div>
    );
  }
}
