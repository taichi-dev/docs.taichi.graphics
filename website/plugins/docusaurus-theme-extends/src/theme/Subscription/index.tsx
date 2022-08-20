import React, { useState } from 'react';

import { translate } from '@docusaurus/Translate';

import jsonp from 'jsonp';
import clsx from 'clsx';

const tester =
  /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const emailValidate = function (email) {
  if (!email) return false;

  const emailParts = email.split('@');

  if (emailParts.length !== 2) return false;

  const account = emailParts[0];
  const address = emailParts[1];

  if (account.length > 64) return false;
  else if (address.length > 255) return false;
  if (!tester.test(email)) return false;

  return true;
};

const request = (url, { timeout }) => {
  return new Promise((resolve, reject) =>
    jsonp(url, { timeout, param: 'c' }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })
  );
};

function SubscriptionInput() {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [successed, setSuccessed] = useState(false);
  const subscribe = () => {
    if (!emailValidate(email)) {
      setErr('Your email address is incorrect!');
      return;
    }
    setDisabled(true);
    request(
      `https://taichi-lang.us14.list-manage.com/subscribe/post-json?u=4e92b5a2a6c075ad83eb4709d&amp;id=40276d4c2b&EMAIL=${email}`,
      { timeout: 30000 }
    )
      .then(() => {
        setErr('');
        setSuccessed(true);
      })
      .catch(() => {
        setDisabled(false);
        setErr('Subscribe failed. Please retry!');
      });
  };
  const handleEmailChange = (v: string) => {
    setEmail(v)
    if (emailValidate(email)) {
      setErr('')
    }
  }
  return (
    <div className="flex">
      <input
        className={clsx("flex-1 w-0 border bg-grey-0 outline-0 rounded-l-sm py-2 px-4 text-grey-4", { 'border-red-main': err && err.length > 0 })}
        placeholder={translate({
          id: 'theme.subscription.email',
          message: 'Email address',
        })}
        value={email}
        disabled={successed}
        onChange={(e) => handleEmailChange(e.target.value)}
      />
      <button
        disabled={disabled}
        className="bg-brand-cyan py-2 px-3 rounded-r-sm font-bold text-white hover:bg-brand-cyan-dark disabled:bg-grey-3"
        onClick={subscribe}
      >
        {successed ? translate({
          id: 'theme.subscription.subscribed',
          message: 'Subscribed',
        }) : translate({
          id: 'theme.subscription.subscribe',
          message: 'Subscribe',
        })}
      </button>
    </div>
  );
}

export default SubscriptionInput;
