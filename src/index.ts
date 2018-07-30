import app from './app';
import { elevatorAlligator } from './elevator-alligator';

const port = process.env.PORT || 3000

elevatorAlligator.listen();

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})

process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err}`)
    process.exit(1);
})
