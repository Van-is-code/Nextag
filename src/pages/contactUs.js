import React, { useState } from 'react';
import '../style/contact.css'
 function Contact() {
    const [showThanks, setShowThanks] = useState(false);
    const [formData, setFormData] = useState({
      email: '',
      phoneNumber: '',
      message: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setShowThanks(true);
      setTimeout(() => {
      setShowThanks(false);
      setFormData({
        email: '',
        phoneNumber: '',
        message: '',
      });
      }, 2000);
    
    };
    return (
            <div className='contact'>
            <div className='map'>
            <iframe className='size-map'
             title="Google Map"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0463016466124!2d105.78020287510518!3d21.030833280619028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b355336d23%3A0xb337376aa7a9622f!2zVG_DoCBuaMOgIEZQVCBD4bqndSBHaeG6pXk!5e0!3m2!1svi!2s!4v1705304884778!5m2!1svi!2s"
             style={{ border: '0' }}
             allowFullScreen=""
             loading="lazy"
             referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>  
            <h1>Contact Us</h1>
          {showThanks && <p className='message'>Thank you for your contribution!</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className='btn'
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div>
             <input
                className='btn'
                type='text'
                name='phoneNumber'
                placeholder='Phone number'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <br/>
            <div>
             <textarea
                className='btn'
                type='text'
                name='message'
                placeholder='How we can help'
                value={formData.message}onChange={handleChange}
                />
              </div>
              <br/>
              <div className='text-center'>
                <button className='btnSubmit' type='submit'>
                  Submit
                </button>
              </div>
               <br/>
            </form>
            </div>

    )
 }

export default Contact