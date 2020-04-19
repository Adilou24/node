class Serie {
    SerieID ="";
    Title = "";
    Note ="";
    Description ="";
    FK_CatégorieID ="";

    constructor(SerieID, Title, Note, Description,FK_CatégorieID)
    {
        this.SerieID = SerieID;
        this.Title = Title;
        this.Note = Note;
        this.Description = Description;
        this.FK_CatégorieID = FK_CatégorieID;
    }
    
};

module.exports = Serie;