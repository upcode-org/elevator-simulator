import app from './app';
import { elevatorAlligator } from './elevator-alligator';

const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})

elevatorAlligator.listen();

process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err}`)
    process.exit(1);
})
