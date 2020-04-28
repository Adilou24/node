class Serie {
    SerieID ="";
    Title = "";
    Note ="";
    Description ="";
    FK_CatégorieID ="";
    FK_iduser ="";
    Statut ="";

    constructor(SerieID, Title, Note, Description,FK_CatégorieID, FK_iduser, Statut)
    {
        this.SerieID = SerieID;
        this.Title = Title;
        this.Note = Note;
        this.Description = Description;
        this.FK_CatégorieID = FK_CatégorieID;
        this.FK_iduser = FK_iduser;
        this.Statut = Statut;
    }
    
};

module.exports = Serie;