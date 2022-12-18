const { BookModel } = require("../books/models/book.model");
const { mongoConnect, mongoDisconnect } = require("./mongo.connection");
const { ReviewModel } = require("../reviews/models/review.model")

async function seed() {    

    const bookArray = [
      {
        title: "A cabana do pai Tomás",
        date: "07/11/1950",
        language: ["Português","Inglês"],
        status: true,
        author: "Harriet Beecher Stowe",
      },
      {
        title: "Frankenstein",
        date: "01/12/1960",
        language: ["Português","Inglês"],
        status: true,
        author: "Mary Shelley",
      },
      {
        title: "1984",
        date: "01/01/1980",
        language: ["Português","Inglês"],
        status: true,
        author: "George Orwell",
      },
      {
        title: "O mundo se despedaca",
        date: "01/01/1980",
        language: ["Português","Inglês"],
        status: true,
        author: "Chinua Achebe",
      },
      {
        title: "Mil e uma noites",
        date: "01/01/1980",
        language: ["Português","Inglês"],
        status: false,
        author: "Miguel de Cervantes",
      },
    ];

    const reviwArray = [
      {
        title: "Resenha Mil e uma noites",
        review: "Lorem ipsum dolor sit amet, Amet minima cumque, odio aspernatur praesentium soluta omnis voluptatum est magnam!",
        updatedAt: new Date(),
        score: 4,
      }
    ]
    mongoConnect(); 

try{
  await BookModel.insertMany(bookArray);
  await ReviewModel.insertMany(reviwArray); //VERIFICAR COMO FAZER O SEED
  console.log("DB successfully seeded");
} catch(error) {
  console.log(`failed to seed book or review.`);
  console.log(error);
}finally{
  mongoDisconnect();
}

}   

seed();


