import React,{Component} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import tour from '../img/findPhoto.jpg'
import '../App.css';
import myStyle from "../style_sheets/Style.module.css";
import styles from "../style_sheets/Profile.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import pp from "../img/pp.png";

export default class findMyPack extends Component{
   constructor(props){
       super(props);
       this.state={
         cusPacks:[],
         userPacks: [],
         loading: true,
         error: null,
         userName: "",
         userId: props.userId || "",
         user: {}
       };
   }

  componentDidMount(){
    this.retriveCusPacks();
    if (this.state.userId) {
      console.log("User ID from props:", this.state.userId);
      localStorage.setItem('userId', this.state.userId);
      this.retrieveUserName();
    }
  }

  retrieveUserName() {
    axios.get(`http://localhost:8070/user/${this.state.userId}`)
      .then((res) => {
        if (res.data && res.data.user) {
          this.setState({ 
            userName: res.data.user.user_name || "",
            user: res.data.user
          }, () => {
            if (this.state.userName) {
              this.filterPackagesByUserName(this.state.userName);
            }
          });
        }
      })
      .catch((err) => console.log("Error retrieving user:", err));
  }
  
  retriveCusPacks(){
    console.log("Fetching custom packages...");
    axios.get("http://localhost:8070/cusPack/all4")
      .then(res => {
        if(res.data.success){
          console.log("Successfully retrieved packages:", res.data.existingCusPacks);
          this.setState({
            cusPacks: res.data.existingCusPacks,
            loading: false
          }, () => {
            if (this.state.userName) {
              this.filterPackagesByUserName(this.state.userName);
            }
          });
        } else {
          console.error("API returned error status:", res.data);
          this.setState({
            error: "Failed to retrieve packages",
            loading: false
          });
        }
      })
      .catch(err => {
        console.error("Error fetching packages:", err);
        this.setState({
          error: "Failed to connect to server",
          loading: false
        });
      });
  }

  filterPackagesByUserName(userName) {
    const filteredPacks = this.state.cusPacks.filter(pack => 
      pack.name && pack.name.toLowerCase() === userName.toLowerCase()
    );
    this.setState({ userPacks: filteredPacks });
  }

  onDelete(id){
    if (window.confirm("Are you sure you want to cancel this package?")) {
      this.setState({ loading: true });
      fetch(`http://localhost:8070/cusPack/delete/${id}`,{
            method:`DELETE`
      }).then((result)=>{
          result.json().then((resp)=>{
            console.warn(resp)
            alert("Package Cancelled Successfully!")
            this.retriveCusPacks()
          })
      }).catch(err => {
        console.error("Error deleting package:", err);
        alert("Failed to delete package. Please try again.");
        this.setState({ loading: false });
      });
    }
  }

  filterContent(cusPacks,searchTerm){
    console.log("Filtering with search term:", searchTerm);
    const searchTermLower = searchTerm.toLowerCase();
    const results = cusPacks.filter((pack) => 
      pack.name && pack.name.toLowerCase().includes(searchTermLower)
    );
    
    console.log("Search results:", results);
    this.setState({userPacks: results});
  }

  handleTextSearch=(e)=>{
     const searchTerm = e.currentTarget.value;
     console.log("Search input changed:", searchTerm);
     
     axios.get("http://localhost:8070/cusPack/all4").then(res=>{
      if(res.data.success){
         this.filterContent(res.data.existingCusPacks, searchTerm)
      }
     }).catch(error => {
       console.error("Error during search:", error);
     });
  }; 

  renderSidebar() {
    return (
      <div className={styles.navbar_holder}>
        <nav id="sidebarMenu" className={`collapse d-lg-block collapse bg-white ${styles.sidebar}`}>
          <hr className={styles.divider} style={{marginTop: '-40px', marginBottom: '25px'}}/>
          <div className={styles.usercard}>
            <img src={pp} alt="Logo" className={styles.pp}/>
            <div>
              <p className={styles.hello}>Hello,</p>
              <h2 className={styles.username}>{this.state.user.user_name}</h2>
            </div>
          </div>
          <hr className={styles.divider}/>
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link to={`/profile/home/${this.state.userId}`} className={`${styles.sidelinks}`}>
                My Details
              </Link>
            </div>
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link to={`/view/payment+details/${this.state.userId}`} className={styles.sidelinks}>
                Payment Details
              </Link>
            </div>
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link to={`/view/payment+history/${this.state.userId}`} className={styles.sidelinks}>
                Payment History
              </Link>
            </div>
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link to="/print/payment+history" className={styles.sidelinks}>
                Monthly Report
              </Link>
            </div>
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link to={`/find/package/${this.state.userId}`} className={`${styles.sidelinks} active`}>
                My Tour Packages
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }

 render(){
    const { cusPacks, userPacks, loading, error, userName, userId } = this.state;
    const displayPacks = userName ? userPacks : cusPacks;

    return(
      <div className={styles.maincontainer} style={{backgroundColor: "#f7f7f7", minHeight: "100vh"}}>
        {userId && this.renderSidebar()}
        
        <div className={userId ? styles.content : "container"}>
          <div className="bg-white rounded shadow p-4 mb-5">
            <div className="row mb-4">
              <div className="col-md-8">
                <h2 className="display-6 fw-bold text-primary">My Custom Tour Packages</h2>
                {userName ? (
                  <p className="text-success">Welcome {userName}! Here are your custom tour packages.</p>
                ) : (
                  <p className="text-muted">Enter your name in the search box to find your packages</p>
                )}
                
                <div className="input-group mb-4 mt-3">
                  <span className="input-group-text bg-primary text-white">
                    <i className="fa fa-search"></i>
                  </span>
                  <input
                    className="form-control form-control-lg"
                    type="search"
                    placeholder="Search by your name"
                    name="searchTerm"
                    onChange={this.handleTextSearch}
                    defaultValue={userName}
                  />
                </div>
              </div>
              <div className="col-md-4 text-center">
                <img src={tour} className="img-fluid rounded" style={{maxHeight: "200px"}} alt="Tour" />
              </div>
            </div>
            
            <hr className="my-4" />
            
            <div className="packages-container mt-4">
              {loading ? (
                <div className="text-center p-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading your packages...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger text-center" role="alert">
                  <i className="fa fa-exclamation-triangle me-2"></i> {error}
                </div>
              ) : displayPacks.length === 0 ? (
                <div className="text-center p-5">
                  <div className="mb-4">
                    <i className="fa fa-suitcase fa-3x text-muted"></i>
                  </div>
                  <h5>No custom packages found</h5>
                  <p>Create your first custom tour package to see it here</p>
                  <Link to={this.state.userId ? `/customize/package` : "/customize/package"} className="btn btn-primary mt-3">
                    <i className="fa fa-plus-circle me-2"></i> Create a Package
                  </Link>
                </div>
              ) : (
                <div className="row">
                  {displayPacks.map((cusPack, index) => (
                    <div className="col-lg-6 mb-4" key={index}>
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-primary text-white py-3 d-flex justify-content-between">
                          <h5 className="card-title mb-0">
                            <i className="fa fa-suitcase me-2"></i>
                            {cusPack.name}'s Tour Package
                          </h5>
                          <div>
                            <Link 
                              to={`/edit/cuspack/${cusPack._id}${this.state.userId ? `/${this.state.userId}` : ''}`} 
                              className="btn btn-sm btn-light me-2"
                              title="Edit Package"
                            >
                              <i className="fa fa-edit"></i>
                            </Link>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => this.onDelete(cusPack._id)}
                              title="Delete Package"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row mb-2">
                            <div className="col-5 text-muted">Email:</div>
                            <div className="col-7 fw-bold">{cusPack.email}</div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-5 text-muted">Phone:</div>
                            <div className="col-7 fw-bold">{cusPack.phone}</div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-5 text-muted">Arrival Date:</div>
                            <div className="col-7 fw-bold">{cusPack.arriDate}</div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-5 text-muted">Pickup location:</div>
                            <div className="col-7 fw-bold">{cusPack.pickPlace}</div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-5 text-muted">Destination:</div>
                            <div className="col-7 fw-bold">{cusPack.destination}</div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-5 text-muted">Days:</div>
                            <div className="col-7 fw-bold">{cusPack.NofDays}</div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-5 text-muted">Notes:</div>
                            <div className="col-7">{cusPack.notes}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center mt-5">
              <div className="d-flex justify-content-center gap-3">
                <Link to={this.state.userId ? `/customize/package` : "/customize/package"} className="btn btn-primary">
                  <i className="fa fa-plus-circle me-2"></i> Create New Package
                </Link>
                {!this.state.userId && (
                  <Link to="/view/cuspackage" className="btn btn-outline-secondary">
                    <i className="fa fa-arrow-left me-2"></i> Back to Packages
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) 
 }
}