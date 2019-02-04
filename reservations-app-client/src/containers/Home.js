import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import config from "../config";
import "./Home.css";
import swal from 'sweetalert';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      client_name: "",
      minion: "",
      email: "",
      phone: "",
    };
  }

  validateForm() {
    return (this.state.client_name == "" || this.state.email == "" || this.state.minion == "" || this.state.phone.length < 8)
  }

  formErrors(){
    if(this.state.client_name == ""){
      swal("Oops!", "Nome não pode estar vazio.", "error");
    }
    else if(this.state.email == ""){
      swal("Oops!", "Email não pode estar vazio", "error");
    }
    else if(this.state.minion == ""){
      swal("Oops!", "Você deve escolher um minion.", "error");
    }
    else if(this.state.phone == ""){
      swal("Oops!", "Telefone não pode estar vazio", "error");
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleChangeRadio = event => {
    this.setState({
      minion: event.target.value
    });
  }

  sendEmail(client_name, email, minion, phone){
    this.setState({ isLoading: true });

    API.post("reservations", "/email/send", {
      body: {
        client_name: client_name,
        email: email,
        minion: minion,
        phone: phone
      }
    }).then(response => {
      swal("Parabéns!", "Sua reserva foi realizada com sucesso!", "success");
    }).catch(error => {
      this.setState({ isLoading: false });
      alert(error.response);
    });

  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.createReservation({
        client_name: this.state.client_name,
        minion: this.state.minion,
        email: this.state.email,
        phone: this.state.phone
      });
      this.sendEmail(this.state.client_name,this.state.email, this.state.minion, this.state.phone);
      this.setState({ isLoading: false });
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createReservation(reservation) {
    return API.post("reservations", "/reservations", {
      body: reservation
    });
  }

  render() {
    return (
      <div className="Home">
        <section id="main">
            <div class="frame">
  							<div class="text">
  								<img id="yellow-logo" src="img/yellow-logo.svg" alt="Logo amarelo dos Minions"/>
  								<p>Se apaixone por toda essa<br/>fofura.<br/>Conheça a loja oficial dos<br/>Minions.</p>
  							</div>
  							<img id="minion-1" src="img/minions-1.png" alt="Minions"/>
  							<img id="double-arrow-down" src="img/arrow-of-double-angle-pointing-down.svg" alt="Seta dupla para baixo"/>
            </div>
        </section>

  			<section id="minions" class="clear">
  				<h2>conheça nossos minions!</h2>
  				<div class="half-screen active" id="half-screen-left">
  				</div>
  				<div class="half-screen" id="half-screen-right">
  				</div>
  				<div id="minions-info">
  						<div class="minion-show active" id="first-minion">
  							<img src="/img/first-minion.png" alt="Minion #1"/>
  							<div class="text">
  								<h3>Minion #1</h3>
  								<p>Minions ipsum tulaliloo belloo! Poulet tikka masala belloo! Jeje la bodaaa bee do bee do bee do ti aamoo! Uuuhhh. Belloo! tank yuuu! Bananaaaa tank yuuu! Pepete chasy bappleees pepete la bodaaa bananaaaa chasy</p>
  							</div>
  						</div>
  						<div class="minion-show" id="second-minion">
  							<img src="img/second-minion.png" alt="Minion #2"/>
  							<div class="text">
  								<h3>Minion #2</h3>
  								<p>Minions ipsum tulaliloo belloo! Poulet tikka masala belloo! Jeje la bodaaa bee do bee do bee do ti aamoo! Uuuhhh. Belloo! tank yuuu! Bananaaaa tank yuuu! Pepete chasy bappleees pepete la bodaaa bananaaaa chasy</p>
  							</div>
  						</div>
  				</div>
  			</section>

  			<section id="contact">
  					<h2>gostou? reserve seu minion agora!</h2>
  					<div class="frame">
  						<img src="img/minion-2.png" alt="Minion correndo"/>
              <form onSubmit={this.handleSubmit} id="contact-form">
                  <div class="form-group item">
                    <ControlLabel>Nome:</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.client_name}
                      componentClass="input"
                      type="text"
                      id="client_name"
                    />
                  </div>
                  <div class="form-group item radio">
                    <ControlLabel>Escolha seu Minion:</ControlLabel>
                    <FormControl
                      type="radio"
                      label="first radio"
                      name="formHorizontalRadios"
                      checked={this.state.minion === "1"}
                      onChange={this.handleChangeRadio}
                      value='1'
                      id="minion-1-radio"
                    />
                    <FormControl
                      type="radio"
                      label="second radio"
                      name="formHorizontalRadios"
                      checked={this.state.minion === "2"}
                      onChange={this.handleChangeRadio}
                      value='2'
                      id="minion-2-radio"
                    />
                    <label for="minion-1-radio" class="minion-radio">Minion #1</label>
								    <label for="minion-2-radio" class="minion-radio">Minion #2</label>
                  </div>
                  <div class="form-group item">
                    <ControlLabel>E-mail:</ControlLabel>
                    <FormControl
                      onChange={this.handleChange}
                      value={this.state.email}
                      componentClass="input"
                      type="email"
                      id="email"
                    />
                  </div>
                  <div class="form-group item">
                    <ControlLabel>Telefone:</ControlLabel>
                    <FormControl
                      inputRef="phone"
                      onChange={this.handleChange}
                      value={this.state.phone}
                      componentClass="input"
                      type="tel"
                      id="phone"
                      pattern="[0-9]{8-11}"
                      title="Deve conter no mínimo 8 números"
                    />
                  </div>
                  <LoaderButton
                    block
                    bsStyle="primary"
                    bsSize="large"
                    disabled={this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Reservar"
                    loadingText="Reservando…"
                  />
              </form>
  					</div>
  			</section>

      </div>
    );
  }
}
