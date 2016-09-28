class ChildRewardList extends React.Component {
  constructor(){
    super()
    this.state = {
      displayAlert: false
    }
    this.handlePurchase = this.handlePurchase.bind(this)
    this.toggleAlert = this.toggleAlert.bind(this)
  }

  handlePurchase(event) {
    event.preventDefault();
    $.ajax({
      method: 'post',
      url: '/notifications',
      data: {
        text: this.props.child.name + " wants to buy a reward: " + event.target.name, amount: 0, type: "Spending"
      }
    }).done((response) => {
      this.setState({
        displayAlert: true
      })
    })
  }

  toggleAlert(){
    this.setState({
      displayAlert: false
    })
  }

  render(){
    return(
      <div>
      <table className="table table-sm table-striped">
        <thead className="thead-default">
          <tr>
            <th>Reward</th>
            <th>Cost</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.rewards.map((reward, idx) =>
              <tr key={idx}>
                <th scope="row">{reward.item}</th>
                <td>{reward.dollars}</td>
                <td><a name={reward.item} onClick={this.handlePurchase}>buy</a></td>
              </tr>
            )
          }
        </tbody>
      </table>
      {this.state.displayAlert ? <div className="alert alert-success ">
        <button type="button" className="close" aria-label="Close">
        <span onClick={this.toggleAlert}aria-hidden="true">&times;</span>
        </button>
        <strong>Yay!</strong> Your parents will give you your reward!
      </div> : null }
      </div>
    )
  }
}
