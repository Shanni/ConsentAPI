export function logErrors(err: Error, req: any, res: any, next: any) {
  console.error(err.stack);
  next(err);
}

export function clientErrorHandler(err: Error, req: any, res: any, next: any) {
  if (req.xhr) {
    //res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
}

export function errorHandler(err: Error, req: any, res: any, next: any) {
  res.status(500);
  res.render("error", { error: err });
}
