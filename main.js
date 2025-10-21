// index.js
export default async ({ req, res, log }) => {
  log("Request received!");
  log("Headers: " + JSON.stringify(req.headers));
  log("Body: " + req.body);

  return res.json({
    success: true,
    received: req.body
  });
};
