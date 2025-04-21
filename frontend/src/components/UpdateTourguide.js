import React,{useEffect, useState} from "react"
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";


//Update data from database

export default function UpdateTourguide(){

  const [fullName, setFullName] = useState("");
  const [age,setAge] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("Male");
  const [nicNumber, setNicNumber] = useState("");
  const [eMail, setEmail] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const history = useHistory();

  //get data from database
  useEffect(() => {
      getTourguides();
    }, []);
  
    function getTourguides() {
      let isMounted = true;
      setLoading(true);
  
      fetch(`http://localhost:8070/tourguide/get/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch tourguide data');
          }
          return res.json();
        })
        .then((result) => {
          if (isMounted) {
            setFullName(result.fullName);
            setAge(result.age);
            setAddress(result.address);
            setDateOfBirth(result.dateOfBirth);
            setContactNumber(result.contactNumber);
            setGender(result.gender || "Male");
            setNicNumber(result.nicNumber);
            setEmail(result.eMail);
            setWorkExperience(result.workExperience);
            setAmount(result.amount);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError("Failed to load tourguide data. Please try again.");
            setLoading(false);
            console.error("Error fetching data:", err);
          }
        });
  
      return () => { isMounted = false; };
    }

  
  function updateData(e){
      e.preventDefault();
      
      // Basic validation
      if (!fullName || !age || !address || !dateOfBirth || !contactNumber || !nicNumber || !eMail) {
        alert("Please fill all required fields");
        return;
      }
      
      // Email validation
      if (!eMail.includes('@') || !eMail.includes('.')) {
        alert("Please enter a valid email address");
        return;
      }
      
      // NIC validation (assuming Sri Lankan NIC format)
      if (!(nicNumber.length === 10 || nicNumber.length === 12)) {
        alert("Please enter a valid NIC number");
        return;
      }

      setLoading(true);
      setError(null);

      const updateTourguide = {
        fullName,
        age,
        address,
        dateOfBirth,
        contactNumber,
        gender,
        nicNumber,
        eMail,
        workExperience,
        amount,
      }

      axios
        .patch(`http://localhost:8070/tourguide/update/${id}`, updateTourguide)
        .then((res) => {
          setLoading(false);
          alert("Tourguide Updated Successfully!");
          history.push("/all/tourguide");
        })
        .catch((err) => {
          setLoading(false);
          const errorMessage = err.response?.data?.message || "Database Error. Please try again later.";
          setError(errorMessage);
          alert(errorMessage);
          console.error("Update error:", err);
        });
  }

// Display loading state
if (loading && !error) {
  return (
    <div className="container text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading...</p>
    </div>
  );
}

// Display error state
if (error && !loading) {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        {error}
        <button className="btn btn-outline-danger ms-3" onClick={getTourguides}>
          Try Again
        </button>
      </div>
    </div>
  );
}

return(
  <div className="container p-3 mb-2 bg-white text-black" style={{marginTop:'40px', borderRadius:'10px'}}> 
    <div className="container">
       <div className="text-center">
        <h2><strong>Update Tourguide Details</strong></h2>
        </div>
        <form className="tourguide" onSubmit={updateData}>
        <div className="row">
       
  
       <div className="form-group col-md-6">
       <label htmlFor="fullName" className="form-label text-black">Tourguide Name <span className="text-danger">*</span></label>
       <input type="text" className="form-control" id="fullName" placeholder="Enter Tourguide Name" value={fullName} onChange={(e)=>{
      
      setFullName(e.target.value);
      
       }} required /> <br/>
      </div>
    
      
      <div className="form-group col-md-6">
       <label htmlFor="age" className="form-label text-black">Age <span className="text-danger">*</span></label>
       <input type="text" className="form-control" id="age" placeholder="Enter Tourguide Age" value={age}  onChange={(e)=>{
      
      setAge(e.target.value);
      
      }} required /> <br/>
      </div>
      
      <div className="form-group col-md-6">
       <label htmlFor="address" className="form-label text-black">Address <span className="text-danger">*</span></label>
       <input type="text" className="form-control" id="address" placeholder="Enter Tourguide Address" value={address} onChange={(e)=>{
      
      setAddress(e.target.value);
      
      }} required /> <br/>
      </div>
      
      <div className="form-group col-md-6">
       <label htmlFor="dateOfBirth" className="form-label text-black">Date Of Birth <span className="text-danger">*</span></label>
       <input type="date" className="form-control" id="dateOfBirth" placeholder="Enter Tourguide Birthday" value={dateOfBirth} onChange={(e)=>{
      
      setDateOfBirth(e.target.value);
      
      }} required /> <br/>
      </div>
      
      <div className="form-group col-md-6">
       <label htmlFor="contactNumber" className="form-label text-black">Contact Number <span className="text-danger">*</span></label>
       <input type="number" className="form-control" id="contactNumber" placeholder="Enter Tourguide Contact Number" value={contactNumber}  onChange={(e)=>{
      
      setContactNumber(e.target.value);
      
      }} required /> <br/>
      </div>
      
      <div className="form-group col-md-6">
     <label htmlFor="gender" className="form-label text-black">Gender</label>
      <select id="gender" className="form-control" required placeholder="Gender" value={gender}
       onChange={(e)=> {
        setGender(e.target.value);
       }}><br/>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
          </div>
      
      
      <div className="form-group col-md-6">
       <label htmlFor="nicNumber" className="form-label text-black">NIC Number <span className="text-danger">*</span></label>
       <input type="text" className="form-control" id="nicNumber" placeholder="Enter Tourguide NIC Number" value={nicNumber} onChange={(e)=>{
      
      setNicNumber(e.target.value);
      
      }} required /> <br/>
      </div>
      
      
      <div className="form-group col-md-6">
       <label htmlFor="eMail" className="form-label text-black">E mail <span className="text-danger">*</span></label>
       <input type="email" className="form-control" id="eMail" placeholder="Enter Tourguide Email" value={eMail} onChange={(e)=>{
      
      setEmail(e.target.value);
      
      }} required /> <br/>
      </div>
      
      <div className="form-group col-md-6">
       <label htmlFor="workExperience" className="form-label text-black">Work Experience</label>
       <input type="text" className="form-control" id="workExperience" placeholder="Enter Tourguide Work Experience" value={workExperience} onChange={(e)=>{
      
      setWorkExperience(e.target.value);
      
      }}/>
      
      </div>

      <div className="form-group col-md-6">
       <label htmlFor="amount" className="form-label text-black">Amount</label>
       <input type="text" className="form-control" id="amount" placeholder="Enter Tourguide expected Amount" value={amount} onChange={(e)=>{
      
      setAmount(e.target.value);
      
      }}/>
      
      </div>
      
      
      </div>
      
      <div className="d-flex justify-content-between mt-4">
        <button type="submit" className="btn btn-primary" style={{width:'300px', borderRadius:'20px'}} disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Updating...
            </>
          ) : (
            <strong>Update Tourguide Details</strong>
          )}
        </button>
        
        <Link to="/all/tourguide" className="btn btn-secondary" style={{width:'300px', color:"white", borderRadius:'20px'}}>
          <strong>Cancel</strong>
        </Link>
      </div>
            
        </form>
    </div>
    </div>
 )
}

