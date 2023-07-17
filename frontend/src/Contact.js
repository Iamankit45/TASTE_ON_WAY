import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

           
          }
        }
      }
    }
  `;



  return (
    <Wrapper>

      <h2 className="common-heading">Contact us</h2>

      


       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.8291148979306!2d80.02273867529418!3d23.17643621056882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981a94397365dd3%3A0x5f9aeb812c2678c9!2sIIITDM%20Jabalpur!5e0!3m2!1sen!2sin!4v1689578845804!5m2!1sen!2sin"
        width="100%"
         height="450"
         style={{border:0 }}
           allowfullscreen=""
            loading="lazy"
             referrerpolicy="no-referrer-when-downgrade">

             </iframe>
       <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xayzrgok"
            method="POST"
            className="contact-inputs">
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              autoComplete="off"
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"></textarea>

            <input type="submit" value="send" />
          </form>
        </div>
        </div>
    </Wrapper>);
};

export default Contact;
