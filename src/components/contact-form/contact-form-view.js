import React from 'react';

export default props => {
  function handleInput() {}

  function handleBlur() {}

  return (
    <form className='contact-form' name='contact' data-netlify='true'>
      <input
        className='contact-form__field'
        name='email'
        type='email'
        aria-label='E-mail'
        placeholder='E-mail'
        onInput={handleInput}
        onBlur={handleBlur}
      />
      <textarea
        className='contact-form__field'
        type='textarea'
        name='message'
        aria-label='Message'
        placeholder='Message'
        rows={10}
        minLength={50}
        onInput={handleInput}
        onBlur={handleBlur}
      />
      <input type='hidden' name='form-name' value='contact' />
      <input className='button' type='submit' value='Envoyer' />
    </form>
  );
};
