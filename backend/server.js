const app = require("./src/app");


app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is Listening to ${process.env.PORT}`);
});
