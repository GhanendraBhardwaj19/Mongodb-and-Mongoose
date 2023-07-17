const mongoose = require("mongoose");
var validator = require("validator");

// create package.json by command:npm init -y then install mongoose by npm i mongoose

mongoose
  .connect("mongodb://127.0.0.1:27017/gbhardwaj", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful..!"))
  .catch((err) => console.log(err));

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique:true,
    // lowercase:true,
    // minlength:2,
    // trim:true
  },
  ctype: String,
  email: {
    type: String,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid!");
      }
    },
  },
  videos: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("video count should be greater than 0.");
      }
    },
  },
  author: String,
  active: Boolean,
});

const Playlist = new mongoose.model("Playlist", playlistSchema);

// first method

// const reactPlaylist = new Playlist({
//     name: "React JS",
//     ctype: "Front end",
//     videos: 40,
//     author: "Ghanendra Bhardwaj",
//     active: true,
//   });

//  reactPlaylist.save();

// second method

const createDocument = async () => {
  try {
    const reactPlaylist = new Playlist({
      name: "React JS",
      ctype: "Front end",
      email: "ghne@gmail.co",
      videos: 40,
      author: "Ghanendra Bhardwaj",
      active: true,
    });

    const jsPlaylist = new Playlist({
      name: "JS",
      ctype: "Back end",
      email: "ghanendr@gmail.co",
      videos: 30,
      author: "Ghanendra Bhardwaj",
      active: true,
    });

    const nodeJsPlaylist = new Playlist({
      name: "Node JS",
      ctype: "Back end",
      email: "ghane@gmail.co",
      videos: 25,
      author: "Ghanendra Bhardwaj",
      active: true,
    });

    // inserting multiple documents
    const result = await Playlist.insertMany([
      reactPlaylist,
      jsPlaylist,
      nodeJsPlaylist,
    ]);
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();

// read the document
const getDocument = async () => {
  try {
    // const result = await Playlist.find({ ctype: "Back end" }).select({
    //   name: 1,
    // });

    // const result = await Playlist.find({ videos: { $gt: 30 } });

    // const result = await Playlist.find({
    //   $and: [{ ctype: "Back end" }, { author: "Ghanendra Bhardwaj" }],
    // });

    // const result = await Playlist.find({
    //   author: "Ghanendra Bhardwaj",
    // }).countDocuments();

    const result = await Playlist.find().sort({ videos: 1 });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getDocument();

// update the document(s)

// const updateDocument = async (_id) => {
//   try {
//     const result = await Playlist.findByIdAndUpdate(
//       { _id },
//       {
//         $set: {
//           name: "JAVA",
//         },
//       },
//       {
//         new: true,
//       }
//     );

//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
// updateDocument("64b52d670251df786f86b1e6");

// delete the document(s)

// const deleteDocuments = async () => {
//   try {
// findByIdAndDelete is one method to delete a document
//     const result = await Playlist.deleteMany();
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
// deleteDocuments();
