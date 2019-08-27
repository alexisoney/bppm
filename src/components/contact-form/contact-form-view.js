import React from 'react';

export default props => {
  function handleInput() {}

  function handleBlur() {}

  return (
    <form
      className='contact-form'
      name='contact-dev'
      data-netlify='true'
      data-netlify-honeypot='bot-field'
      action='/thanks'
      method='POST'
    >
      <input type='hidden' name='form-name' value='contact-dev' />
      <div hidden>
        <label>
          Ne pas remplir / Don’t fill this out: <input name='bot-field' />
        </label>
      </div>
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
        onInput={handleInput}
        onBlur={handleBlur}
      />
      <button className='button' type='submit'>
        <span className='button__text'>{props.blok.button}</span>
      </button>
    </form>
  );
};
