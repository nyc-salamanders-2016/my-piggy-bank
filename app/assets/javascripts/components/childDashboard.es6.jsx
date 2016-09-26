class ChildDashboard extends React.Component {
  constructor(){
    super()
    this.state = {
      current_child: ''
    }
    this.liveNotifications = this.liveNotifications.bind(this)
  }

  componentWillMount(){
    this.setState({
			current_child: this.props.current_child
		})
  }

  componentDidMount(){

    $('.banks').droppable({
    	accept: ".coin",
    	drop: function(event,ui){

          bank = this.props.current_child.banks.find(function(bank){return bank.type === $(event.target).attr('id')})

    		var bankId = bank.id

    		$.ajax({
    			url: '/banks/'+bankId,
    			method: 'PUT',
    			data: {value: $(ui.draggable[0]).attr('value')}
    		})
    		.done((response)=>{

          this.setState({
      			current_child: response
      		})
    			ui.draggable.remove();
    		})
    	}.bind(this)
    })

  }

  liveNotifications(response){
    this.props.newNotifications(response)
  }

	render(){
  
		return(
			<div>
			<UndepositedFunds current_child={this.state.current_child} />
			<ChangeMachine current_child={this.state.current_child} />

  			   <Banks notifications={this.liveNotifications} interestAmount = {this.props.interestAmount} current_child={this.state.current_child}/>

			</div>
		)
	}
}
