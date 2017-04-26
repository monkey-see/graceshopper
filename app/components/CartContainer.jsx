import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {updateOrderInDB} from '../reducers/orders'

function CartContainer(props) {
  if (props.order.glasses && props.order.glasses.length > 0) {
    return (
      <div>
       <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-10 col-md-offset-1" style={{color: '#c12e2a'}}>
            <h1>Your Shopping Cart</h1>
          </div>
        </div>
      </div>
      <div className="container" >
      <div className="row" >
          <div className="col-sm-12 col-md-10 col-md-offset-1" style={{border: '1px solid #ccc', borderRadius: '10px', paddingTop: '10px'}}>
              <table className="table table-hover">
                  <thead>
                      <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Remove</th>
                      </tr>
                  </thead>
                  <tbody>
                      {props.order.glasses && props.order.glasses.map(glasses => (
                        <tr>
                          <td key={glasses.id} className="col-md-8" style={{verticalAlign: 'middle', fontFamily: 'Raleway, sans-serif'}} >
                          <div className="media">
                              <Link to={`/glasses/${glasses.id}`} className=" pull-left" style={{marginRight: '10px'}}>
                                <img className="media-object img-responsive" src={glasses.image} style={{width: '200px', height: '70px'}}/>
                              </Link>
                              <div className="media-body" >
                                  <h4 className="media-heading"><Link to={`/glasses/${glasses.id}`}>{glasses.name}</Link></h4>
                                  <span>Status: </span><span className="text-danger"><strong>Leaves warehouse in 2 - 3 weeks</strong></span>
                              </div>
                          </div>
                          </td>
                          <td className="col-md-1" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                          <strong>1</strong>
                          </td>
                          <td className="col-md-1 text-center" style={{textAlign: 'center', verticalAlign: 'middle'}}><strong>${glasses.price / 100}</strong></td>

                          <td className="col-md-1" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <button className="btn btn-danger" onClick={() => {
                              const newGlasses = []
                              props.order.glasses.forEach(singleGlasses => {
                                if (glasses.id !== singleGlasses.id) newGlasses.push(singleGlasses.id)
                              })
                              props.removeGlassesFromOrder(props.order.id, newGlasses)
                            }} >Delete</button>
                           </td>
                        </tr>
                        )
                      )
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td style={{color: '#c12e2a'}}><h5>Subtotal:</h5></td>
                        <td className="text-center">
                          <h5><strong>
                                ${props.order.glasses && props.order.glasses.reduce((totalPrice, glasses) => totalPrice + glasses.price / 100, 0)}
                              </strong>
                          </h5>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><h5 style={{color: '#c12e2a'}}>Shipping:</h5></td>
                        <td className="text-center"><h5><strong>$10.94</strong></h5></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><h3 style={{color: '#c12e2a'}}>Total</h3></td>
                        <td className="text-center"><h3><strong>${props.order.glasses && props.order.glasses.reduce((totalPrice, glasses) => totalPrice + glasses.price / 100, 10.94)}</strong></h3></td>
                    </tr>
                      <tr>
                        <td>
                          <Link to='/'><button className="btn btn-primary pull-left">Continue Shopping</button></Link>
                        </td>
                        <td></td>
                        <td></td>
                        <td>
                          <Link to='/checkout'><button className="btn btn-success">Checkout</button></Link>
                        </td>
                    </tr>
                  </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>)
  } else {
    return (
      <div className="container text-center">
        <div className="row" >
          <div className="col-sm-12" style={{color: '#c12e2a', marginBottom: '20px'}}>
            <h1>Your shopping cart is currently empty</h1>
          </div>
          <div className="col-sm-12" style={{color: '#c12e2a'}}>
            <Link to='/'><button className="btn btn-primary">Continue Shopping</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
      order: state.order
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      removeGlassesFromOrder: (orderId, glassesIdArr) => {
        dispatch(updateOrderInDB(orderId, glassesIdArr))
      }
    }
  }
)(CartContainer)
