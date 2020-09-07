import React, { Component } from 'react'
import axios from 'axios';

class CreditApplicationScreen extends Component {

    state = {
        applicationResult: false,
        identityNumber: null,
        firstName: null,
        lastName: null,
        salary: null,
        phoneNumber: null,
        pendingApiCall: false,
        creditResult: null
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    onFormSubmit = event => {
        event.preventDefault();

        const body = {
            identityNumber: this.state.identityNumber,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            salary: this.state.salary,
            phoneNumber: this.state.phoneNumber
        }
        this.setState({ pendingApiCall: true });
        axios.post("http://localhost:8081/credit", body)
            .then(response => {
                this.setState({ creditResult: response.data });
                this.setState({applicationResult: true})
            })
            .catch(error => {
                this.setState({ pendingApiCall: false });
            })

    }



    render() {
        return (
            <div className="container">
                {!this.state.applicationResult
                    ?
                    <div>
                        <form>

                            <h1 className="text-center">Kredi Başvuru Ekranı</h1>

                            <div className="form-group">
                                <label>TC Kimlik No</label>
                                <input className="form-control" name="identityNumber" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label>Adınız</label>
                                <input className="form-control" name="firstName" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label>Soyadınız</label>
                                <input className="form-control" name="lastName" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label>Aylık Geliriniz</label>
                                <input className="form-control" name="salary" onChange={this.onChange} type="number" />
                            </div>
                            <div>
                                <label className="form-group">Telefon Numarası</label>
                                <input className="form-control" name="phoneNumber" onChange={this.onChange} />
                            </div>

                            <div className="text-center">
                                <button className="btn btn-primary"
                                    onClick={this.onFormSubmit}
                                    disabled={this.state.pendingApiCall}
                                >
                                    {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm" />}
                                    Başvuru
                        </button>
                            </div>
                        </form>
                    </div>
                    :
                    <div>
                        <div class="card text-center">
                            <div class="card-header">
                                <h1>{this.state.creditResult.creditResult}</h1>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Sayın {this.state.firstName + " " + this.state.lastName + ", "}</h5>
                                <p class="card-text">{this.state.creditResult.message}</p>
                                {this.state.creditResult.limit !== 0 && <button class="btn btn-primary btn-lg active" aria-pressed="true">
                                     { "Limitiniz " + this.state.creditResult.limit + " TL"} 
                                </button>
                                }
                            </div>
                            <div class="card-footer text-muted">
                                Sms ile bilgilendirme mesajı gelicektir. Tel No : {this.state.phoneNumber}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default CreditApplicationScreen;