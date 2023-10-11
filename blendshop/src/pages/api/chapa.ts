import { NextApiRequest, NextApiResponse } from 'next';
import request from 'request';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { amount, 
    email, 
    phone_number, 
    tx_ref, 
    callback_url } = req.body;
  const options = {
    method: 'POST',
    url: 'https://api.chapa.co/v1/transaction/initialize',
    headers: {
      'Authorization': 'Bearer CHASECK_TEST-lHZG4F0XmozEzpjPRPBkxt9LRsx6Jhgt',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "amount": `${amount}`,
      "currency": "ETB",
      "email": `${email}`,
      "phone_number": `${phone_number}`,
      "tx_ref":    `${tx_ref}`,
      "callback_url": `${callback_url}`,
      "return_url": "http://localhost:3000/buy",
    }),
  };

  request(options, function (error: any, response: any) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to initialize payment' });
    }

    console.log(response.body);
    res.status(200).json({ result: response.body });
  });
};
