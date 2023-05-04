import React, { useState} from 'react'
import '../Style/index.css'
import axios from 'axios'

// to reset a form
const INITIAL_STATE = {
    name:'',
    email:'',
    subject:'',
    message:'',
}

const ContactUsForm = () => {
    const [form, setForm] = React.useState({INITIAL_STATE}) 
    const [formErrors, setformErrors] = useState({})
   // const [isSubmit, setIsSubmit] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setForm({...form,
        [event.target.id]: event.target.value,
    });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setForm(INITIAL_STATE);
        setformErrors(validate(form))
        setLoading(true)
        axios.post('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', {form})
        .then(response => console.log(response))
        .catch(err => console.log (err))
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.name) {
            errors.name = "Name is required" ;
        }
        if(!values.email) {
            errors.email = "Email is required" ;
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if(!values.message) {
            errors.message = "Message is required" ;
        }
        return errors;
    }
    
     return (
        <div className="body">
             {loading && <div>Submitting ...</div>}
            {Object.keys(formErrors).length === 0 && loading? (<div className='output'> CONGRATULATION! Your submission was successful</div>)
            : (<div className='output' id='output1'>TRY AGAIN! Your submission was not successful </div>)}

         <form className='form' onSubmit={handleSubmit}>
            <h3>Contact Us</h3>
            <div id='inputName'>
                <div className='inputField'>
                    <label htmlFor='name'> Full Name * </label>
                    <input id='name' type='text' value={form.name} onChange={handleChange}/>
                </div>
                <p className='error'>{formErrors.name}</p>
            </div>

            <div div className='input'>
                <div className='inputField'>
                    <label htmlFor='name'>Email *</label>
                    <input id='email' type='text' value={form.email} onChange={handleChange}/>
                </div>
                <p className='error'>{formErrors.email}</p>
            </div>

            <div className='input'>
                <div className='inputField'>
                    <label htmlFor='subject'>Subject </label>
                    <input id='subject' type='text' value={form.subject} onChange={handleChange}/>
                </div>
            </div>

            <div className='input'>
                <div className='inputField'>
                    <label htmlFor='message'>Message *</label>
                    <textarea rows='20' colums='10' id='message' type='textF' value={form.message} onChange={handleChange} />
                </div>
            <p className='error'>{formErrors.message}</p>
            </div>
            <button className='submit'>SUBMIT</button>
        </form>
    </div>
  )
    }
export default ContactUsForm
