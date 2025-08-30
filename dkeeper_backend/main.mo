import Debug "mo:base/Debug";
import List "mo:base/List";

actor Dkeeper {
  public type Note = {
    title : Text;
    content : Text;
  };

  var notes : List.List<Note> = List.nil<Note>();

  public func createNote(titleText : Text, contentText : Text) {
    let newNote: Note = {
      title = titleText;
      content = contentText;
    };
    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  public func removeNote(id : Nat) {
    // split the list into before and after the id
    let before = List.take(notes, id);
    let after = List.drop(notes, id + 1);
    notes := List.append(before, after);
  };
};
