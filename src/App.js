
import { useState, useEffect } from 'react';

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [staff, setStaff] = useState("");
  const [bio, setBio] = useState("");
  const [notify, setNotify] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function emailIsValid(email) {
    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(validEmail)){return (true)}
      return (false)
  }

  function phoneIsValid(phone) {
    let validPhone = /^\d{10}$/;
    if (phone.length === 0) {return true}
    if (phone.match(validPhone)) {return true}
    return false;
  }

  useEffect(() => {

    let errors = [];
    if (name.length < 1) {
      errors.push("Please enter your name")
    }
    if (!emailIsValid(email)) {
      errors.push("valid email required")
    }
    if (!phoneIsValid(phone)) {
      errors.push("enter a valid phone")
    }
    if (phone.length > 1 && phoneType === "") {
      errors.push("select a phone type")
    }
    if(bio.length > 10) {
      errors.push("Bio must be less than 10 characters")
    }

    setValidationErrors(errors);

  }, [name, email, phone, phoneType, bio]);

  function onSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if(validationErrors.length > 0) {return alert("Cannot submit")}

    let info = {
      name, email, phone, phoneType, staff, bio, notify, submittedOn: new Date()
    }
    console.log(info);

    setName("");
    setEmail("");
    setPhone("");
    setPhoneType("");
    setStaff("");
    setBio("");
    setNotify(false)
    setHasSubmitted(false);
  }

  return (

    <div>

      {hasSubmitted && validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
          id='name'
          type='text'
          onChange={e => setName(e.target.value)}
          value={name}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
          id='email'
          type='text'
          onChange={e => setEmail(e.target.value)}
          value={email}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone #:</label>
          <input
          id='phone'
          type='text'
          onChange={e => setPhone(e.target.value)}
          value={phone}
          />
          <select
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value="" disabled>
              Select a phone type...
            </option>
            <option>Home</option>
            <option>Work</option>
            <option>Mobile</option>
          </select>
        </div>
        <div onChange={e => setStaff(e.target.value)}>
          Instructor
          <input
          name="staff"
          type="radio"
          value="instructor"
          checked={staff==="instructor"}
          />
          Student
          <input
          name="staff"
          type="radio"
          value="student"
          checked={staff==="student"}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>
        <div>
          <label htmlFor="notify">Email me?</label>
          <input
          name="notify"
          type="checkbox"
          onChange={e => setNotify(!notify)}
          checked={notify}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
