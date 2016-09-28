class Bank extends React.Component {
  constructor(){
    super()

    this.handleRequestTransfer=this.handleRequestTransfer.bind(this)
     this.state = {
      displayTransferForm: false,
      displayDonationForm: false,
      displayTransferButton: true,
      error: null,
      displayRedeemAlert: false,
      donateFeedback: false
    }
    this.displayDonationForm = this.displayDonationForm.bind(this)
    this.displayDonationButton = this.displayDonationButton.bind(this)
    this.toggleDisplayTransferForm = this.toggleDisplayTransferForm.bind(this)
    this.toggleDisplayDonationForm = this.toggleDisplayDonationForm.bind(this)
    this.displayTransferForm = this.displayTransferForm.bind(this)
    this.filterBanks = this.filterBanks.bind(this)
    this.handleDonateClick = this.handleDonateClick.bind(this)
    this.showInterest = this.showInterest.bind(this)
    this.displayRedeemButton = this.displayRedeemButton.bind(this)
    this.handleSavingsClick = this.handleSavingsClick.bind(this)
    this.showAccumulatedInterest = this.showAccumulatedInterest.bind(this)
    this.displayDonateFeedback = this.displayDonateFeedback.bind(this)
    this.toggleDisplayFeedback = this.toggleDisplayFeedback.bind(this)
  }

    handleRequestTransfer(event){
    var amount = this.refs.amount.value
    var bank = this.refs.bank.value
    event.preventDefault()
    $.ajax({
      url: '/notifications',
      method: 'POST',
      data: {text: this.props.child.name + " requested a transfer of "
      + amount + " cents from " + this.props.bank.type + " to " + bank,
       amount: amount,
       type: this.props.bank.type}
    }).done((response) => {
      response?
     this.setState({
      displayTransferForm: false,
      displayTransferButton: true,
      error: response.error
     }):
     this.setState({
      displayTransferForm: false,
      displayTransferButton: true,
     })


    })
  }
  toggleDisplayDonationForm(){
    let shouldToggleDonationForm = !this.state.displayTransferForm
    this.setState({
      displayDonationForm: shouldToggleDonationForm
    })

  }
    toggleDisplayTransferForm(){
    let shouldToggleTransferForm = !this.state.displayTransferForm
    let shouldToggleTransferButton = !this.state.displayTransferButton
    this.setState({
      displayTransferForm: shouldToggleTransferForm,
      displayTransferButton: shouldToggleTransferButton
    })
  }



    filterBanks(bank){
    if(bank.type === this.props.bank.type){
      return false
    }
    return true
  }

    displayTransferForm(){

    return(
      <div className="row">
      <form className="form-inline" id="transfer-form" onSubmit={this.handleRequestTransfer} >
      <div className="form-group">
          <label>To: </label>
          <select className="form-control" ref='bank'>
              {
              this.props.child.banks.filter(this.filterBanks).map((bank, idx) => <option key={idx}>{bank.type}</option>)
            }
          </select>
        </div>
        <div className="form-group">
          <label className="label-lg"> <h5>Amount:</h5> </label>

          <input type="number" className="form-control" id="child-transfer-amount-tag" ref='amount' step= "any" min ="0"/>
        </div>
        <button type="submit" className="btn btn-primary child-transfer-submit-tag text-center">Submit</button>

      </form>
         </div>
    )
  }

    handleDonateClick(event){
      event.preventDefault();
       $.ajax({
      url: '/notifications',
      method: 'POST',
      data: {text: this.props.child.name + " wants to make a donation",
       amount: 0,
       type: this.props.bank.type
      }
    }).done((response) => {
      response? 
      this.setState({error: response.error, donateFeedback: true}) :
      this.setState({donateFeedback: true})
    })

    }

    displayDonationForm(){
       return(
         <h1>Where Donation form goes</h1>
        )
    }

    displayDonationButton(){
      return(
         <button type="submit" onClick={this.handleDonateClick} className="btn btn-primary ">Donate!</button>
        )
    }


    displayDonateFeedback(){
      return(
         <div  className="alert alert-success">
          <button  type="button" className="close"  aria-label="Close">
             <span onClick={this.toggleDisplayFeedback} aria-hidden="true">&times;</span>
            </button>
          <strong >You made a donation!</strong>
        </div>

        )
    }

    toggleDisplayFeedback(){
      this.setState({donateFeedback: false})
    }





  showInterest(){

    if(this.props.bank.type === 'Investment'){

      

      if(this.props.interestAmount > 0 ){

        return(
          <div className="alert alert-warning alert-dismissible fade in" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
           <strong>Yay! </strong> You Just earned {this.props.interestAmount} cents interest! 
          </div>
        )
      }


    }
  }

  showAccumulatedInterest(){
    if(this.props.bank.type === 'Investment' && this.props.bank.accumulated_interest >= 0){
        
        return(
       
          <li>
            <h4 className="text-center header">Total interest recieved<br/><p>{this.props.bank.interest_dollars}</p> </h4>
          </li>
        )
      }
    
  }



  displayRedeemButton(){
    return(
      <button type="submit" onClick={this.handleSavingsClick} className="btn btn-primary">Redeem!</button>
    )
  }

  handleSavingsClick(event){
    event.preventDefault()
    $.ajax({
      method: 'post',
      url: '/notifications',
      data: {text: this.props.child.name + " wants to redeem " + this.props.bank.save_item, amount: 0, type: this.props.bank.type }
    }).done((response) => {
      this.setState({
        displayRedeemAlert: true
      })
    })
  }


  render () {

    return (

    	<div className="col-md-3 banks" id={this.props.bank.type}>
        {this.showInterest()}
        <div className="bank-picture">
      	   <img src="piggy4.png" className="img-rounded" alt="piggy" width="250" height="236" id="piggy" />
          <div className="bank-content">
            <li><h1 className="text-center">{this.props.bank.type}</h1></li>
          	
            <li><h1 className="text-center">{this.props.bank.dollars}</h1></li>
            
            <li>{this.props.bank.type === "Saving" && this.props.bank.save_item != null ? <h4 className="text-center header">Saving for my: <br/><p>{this.props.bank.save_item}</p> </h4>: null }</li>

            {this.showAccumulatedInterest()}
          </div>
        </div>

              { this.state.error?
              <div className="row">
               <div className=" col-md-3 alert alert-danger alert-dismissible" role="alert">
                <strong>{this.state.error}</strong>
                 <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
                 </button>
               </div>
              </div>
               : null }

         
      

            <div className="btn-group btn-group-justified list-inline" role="group">

              <li>{this.state.displayTransferButton ? <button type="submit" onClick={this.toggleDisplayTransferForm} className="btn btn-primary ">Request Transfer</button> : null}</li>
              <li>{this.props.bank.type === "Donation" ? this.displayDonationButton() : null }</li>
              <li>{this.props.bank.type === "Saving" ? this.displayRedeemButton() : null }</li>
            </div>

            {this.state.displayTransferForm ? this.displayTransferForm() : null }
             {this.state.donateFeedback? this.displayDonateFeedback():null}
            {this.state.displayRedeemAlert ? <div className="alert alert-success alert-dismissible">


                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                <strong>Yay!</strong> Your parents will redeem your {this.props.bank.save_item}!
               </div> : null}
  
    	</div>

    	)}
}
