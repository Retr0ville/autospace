const bcrypt = require("bcrypt");

const hash = "$2b$10$a2lGtGmK3ibklXhLlcO0uuL52veTLClfcL69E9j89eXbDNtBU.OkG";
let newHash;
bcrypt
  .hash("ratted", 10)
  .then((h) => {
    newHash = h;
  })
  .then(() => {
    dehashed();
  });

const dehashed = async () => {
  const res = await bcrypt.compare("ratted", hash); /* weird, one pass can have  multiple hashes!! */
  console.log(newHash);
  console.log(res);
};