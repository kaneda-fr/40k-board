// Create a schema for our data
var JoueurSchema = new Schema({
  Nom: String,
  Armee: String,
  classement: Number
});
// Use the schema to register a model with MongoDb
//mongoose.model('Classement', ClassementSchema);
var Joueur = mongoose.model('Joueur', JoueurSchema);
