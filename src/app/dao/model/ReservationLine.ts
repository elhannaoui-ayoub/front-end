import {Reservation} from "./Reservation";

export interface ReservationLine {
  id: number;
  dateDebut: String;
  dateFin:String;
  dateReturn:String;
  book_id: number;
  book:any;
  reservation:Reservation;

  penalties:any;
  penalty:String;

}
