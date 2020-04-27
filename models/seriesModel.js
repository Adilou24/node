class Serie {
    SerieID ="";
    Title = "";
    Note ="";
    Description ="";
    FK_CatégorieID ="";
    FK_iduser ="";

    constructor(SerieID, Title, Note, Description,FK_CatégorieID, FK_iduser)
    {
        this.SerieID = SerieID;
        this.Title = Title;
        this.Note = Note;
        this.Description = Description;
        this.FK_CatégorieID = FK_CatégorieID;
        this.FK_iduser = FK_iduser;
    }
    
};

module.exports = Serie;